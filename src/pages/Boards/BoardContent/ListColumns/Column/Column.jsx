import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { mapOrder } from "~/utils/sorts";
import ListCards from "./ListCards/ListCards";

function Column({ column }) {
  // drag and drop
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column._id,
      data: { ...column },
    });

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  // select menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // sort column
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  return (
    <Stack
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      {...listeners}
      ml={2}
      display="flex"
      spacing={2}
      sx={{
        height: "fit-content",
        maxHeight: (theme) =>
          `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
            5
          )})`,
        minWidth: "300px",
        maxWidth: "300px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? " #333643" : "#ebecf0",
        borderRadius: "6px",
      }}
    >
      <Box
        sx={{
          height: (theme) => theme.trelloCustom.columnHeaderHeight,
          p: 2,
          display: "flex",
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
        >
          {column?.title}
        </Typography>
        <Box>
          <Tooltip title="More Option">
            <ExpandMoreIcon
              sx={{ color: "text.primary", cursor: "pointer" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Pase</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <ListCards cards={orderedCards} />
      <Box
        sx={{
          height: (theme) => theme.trelloCustom.columnFooterHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      </Box>
    </Stack>
  );
}

export default Column;
