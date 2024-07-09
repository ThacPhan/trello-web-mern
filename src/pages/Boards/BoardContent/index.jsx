import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import AddCardIcon from "@mui/icons-material/AddCard";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "55px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        <Stack
          ml={2}
          // p={2}
          display="flex"
          spacing={2}
          sx={{
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
                5
              )})`,
            minWidth: "300px",
            maxWidth: "300px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? " #333643" : "#ebecf0",
            borderRadius: "6px",
          }}
        >
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: "flex",
              direction: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
            >
              Header
            </Typography>
            <Box>
              <Tooltip title="More Option">
                <ExpandMoreIcon
                  sx={{ color: "text.primary", cursor: "pointer" }}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Pase</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
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
                `calc(${
                  theme.trelloCustom.boardContentHeight
                } - ${theme.spacing(
                  5
                )} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ced0da",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#bfc2cf",
              },
            }}
          >
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

            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default BoardContent;
