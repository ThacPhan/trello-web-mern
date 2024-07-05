import { Box } from "@mui/material";

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
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
