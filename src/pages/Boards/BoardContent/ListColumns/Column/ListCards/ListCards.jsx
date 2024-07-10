import { Box } from "@mui/material";
import TrelloCard from "./Card/Card";

function ListCards() {
  return (
    <Box
      gap={1}
      sx={{
        p: "0 5px",
        m: "0 5px !important",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
            5
          )} - ${theme.trelloCustom.columnHeaderHeight} - ${
            theme.trelloCustom.columnFooterHeight
          })`,
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ced0da",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2cf",
        },
      }}
    >
      <TrelloCard />
      <TrelloCard hiddenMedia />
    </Box>
  );
}

export default ListCards;
