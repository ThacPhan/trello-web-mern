import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";

const menuStyle = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar() {
  return (
    <Box
      px={2}
      gap={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        borderBottom: "1px solid #00bfa5",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? " #34495e" : "#1976d2",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Chip
          icon={<DashboardIcon />}
          label="Trello MERN Board"
          clickable
          sx={menuStyle}
        />
        <Chip
          icon={<VpnLockIcon />}
          label="Public/Private Workspaces"
          clickable
          sx={menuStyle}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add To Drive Google"
          clickable
          sx={menuStyle}
        />
        <Chip icon={<BoltIcon />} label="Automation" clickable sx={menuStyle} />
        <Chip
          icon={<FilterListIcon />}
          label="Filter"
          clickable
          sx={menuStyle}
        />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white",
            },
          }}
        >
          Invite
        </Button>
        <AvatarGroup max={3}>
          <Tooltip title={"Thac Phan"}>
            <Avatar alt="Thac Phan" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title={"Hoai Le"}>
            <Avatar alt="Hoai Le" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip title={"Minh Nguyen"}>
            <Avatar alt="Minh Nguyen" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip title={"Linh Thuy"}>
            <Avatar alt="Linh Thuy" src="/static/images/avatar/4.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
