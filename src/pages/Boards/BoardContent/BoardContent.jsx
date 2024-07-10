import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";

function BoardContent() {
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
      <ListColumns />
    </Box>
  );
}

export default BoardContent;
