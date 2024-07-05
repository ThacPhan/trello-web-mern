import { Box } from "@mui/material";
import React from "react";

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: "100%",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      {"Bord Bar"}
    </Box>
  );
}

export default BoardBar;
