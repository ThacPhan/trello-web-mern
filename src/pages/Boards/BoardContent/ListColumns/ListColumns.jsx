import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
function ListColumns() {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
      }}
    >
      <Column />
      <Column />

      {/* button add new column */}
      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          mx: 2,
          borderRadius: "6px",
          height: "fit-content",
          bgcolor: "#ffffff3d",
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{ color: "white", width: "100%", justifyContent: "flex-start" }}
        >
          {"Add new column"}
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
