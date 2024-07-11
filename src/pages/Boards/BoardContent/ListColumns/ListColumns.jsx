import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Box, Button } from "@mui/material";
import Column from "./Column/Column";

function ListColumns({ columns }) {
  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
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
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

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
    </SortableContext>
  );
}

export default ListColumns;
