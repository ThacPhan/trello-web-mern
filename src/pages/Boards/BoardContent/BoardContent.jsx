import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";
import Column from "./ListColumns/Column/Column";
import TrelloCard from "./ListColumns/Column/ListCards/Card/Card";
import ListColumns from "./ListColumns/ListColumns";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  // khi click chuột và kéo di chuyển column 10px thì event mới hoạt động over
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  // Nhấn dữ 250ms và di chuyển khoản 5px sẽ kích hoạt event trên touch mobile
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });

  // sử dụng sensors để kich hoạt cả click chuột trên desktop và cả touch trên mobile
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  // 1 thời điểm chỉ có 1 item kéo thả
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null);

  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  // Tìm 1 column theo card
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  // cập nhật lại state khi di chuyển card giữa các columns
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumn) {
        // delete card ở column active (column cũ)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // thêm placeholder card
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        // cập nhật lại mảng orderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }
      if (nextOverColumn) {
        // kiểm tra card đang kéo đã có ở overColumn chưa, nếu có sẽ xóa trước khi chèn
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        // thêm card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        //Xoá Placeholder Card đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        // cập nhật lại mảng orderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }
      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?.columnId) {
      setOldColumnDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  // Đang trong quá trình di chuyển 1 item
  const handleDragOver = (event) => {
    // không làm gì khi column đang được click và di chyển
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;

    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    // Tìm vị trí của cái card sắp overDrag trong column đích
    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== !overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      // Tìm vị trí của cái card sắp overDrag trong column đích
      if (!activeColumn || !overColumn) return;

      if (oldColumnDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        //lấy vị trí cũ
        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(
          (card) => card._id === activeDragItemId
        );
        //lấy vị trí mới
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );

        const dndOrderedCards = arrayMove(
          oldColumnDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);
          return nextColumns;
        });
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // khi phát hiện kéo column là id của active và over đã khác nhau sẽ cập nhật vị trí column mới
      if (active.id !== over.id) {
        //lấy vị trí cũ
        const oldColumnIndex = orderedColumns.findIndex(
          (column) => column._id === active.id
        );
        //lấy vị trí mới
        const newColumnIndex = orderedColumns.findIndex(
          (column) => column._id === over.id
        );

        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );
        // const dndOrderedColumnsIds = dndOrderedColumns.map(
        //   (column) => column._id
        // );
        setOrderedColumns(dndOrderedColumns);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnDraggingCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      // Tìm điểm giao nhau giữa các
      const pointerIntersection = pointerWithin(args);

      if (!pointerIntersection?.length) return;

      // Tìm overId đầu tiên trong intersections
      let overId = getFirstCollision(pointerIntersection, "id");

      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        );
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          p: "12px 0",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? " #34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.trelloCustom.boardContentHeight,
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <TrelloCard card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
