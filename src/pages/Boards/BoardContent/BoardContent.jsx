import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { mapOrder } from "~/utils/sorts";
import ListColumns from "./ListColumns/ListColumns";

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

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // nếu không kéo column thì sẽ return
    if (!over) return;

    // khi phát hiện kéo column là id của active và over đã khác nhau sẽ cập nhật vị trí column mới
    if (active.id !== over.id) {
      //lấy vị trí cũ
      const oldIndex = orderedColumns.findIndex(
        (column) => column._id === active.id
      );
      //lấy vị trí mới
      const newIndex = orderedColumns.findIndex(
        (column) => column._id === over.id
      );

      const dndorderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndorderedColumnsIds = dndorderedColumns.map(
      //   (column) => column._id
      // );
      setOrderedColumns(dndorderedColumns);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
      </Box>
    </DndContext>
  );
}

export default BoardContent;
