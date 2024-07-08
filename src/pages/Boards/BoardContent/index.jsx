import { Box } from "@mui/material";

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? " #34495e" : "#1976d2",
        width: "100%",
        height: "calc(100% - 58px - 48px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {"Bord Content"}
    </Box>
  );
}

export default BoardContent;
