import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import GroupIcon from "@mui/icons-material/Group";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function TrelloCard({ hiddenMedia }) {
  if (hiddenMedia) {
    return (
      <Card
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>Test Column 01</Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://tinypng.com/images/social/website.jpg"
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          10
        </Button>
        <Button size="small" startIcon={<CommentBankIcon />}>
          30
        </Button>
        <Button size="small" startIcon={<AttachFileIcon />}>
          80
        </Button>
      </CardActions>
    </Card>
  );
}

export default TrelloCard;
