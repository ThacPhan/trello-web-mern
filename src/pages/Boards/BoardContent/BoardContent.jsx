import { Box } from "@mui/material";
import { mapOrder } from "~/utils/sorts";
import ListColumns from "./ListColumns/ListColumns";

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
  return (
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
  );
}

export default BoardContent;
