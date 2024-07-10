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

function TrelloCard({ card }) {
  const shouldShowCardAction = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      {card?.cover && (
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={card?.cover}
        />
      )}

      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() && (
        <CardActions sx={{ p: "0 4px 8px" }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}

          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentBankIcon />}>
              {card?.comments?.length}
            </Button>
          )}

          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachFileIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

export default TrelloCard;
