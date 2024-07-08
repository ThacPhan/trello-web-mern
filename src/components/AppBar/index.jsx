import { HelpOutline, Notifications } from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SearchIcon from "@mui/icons-material/Search";
import {
  Badge,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";
import { ReactComponent as Logo } from "~/assets/logo.svg";
import ModeSelect from "~/components/ModeSelect";
import Profiles from "./Menus/Profiles";
import Recent from "./Menus/Recent";
import Started from "./Menus/Started";
import Templates from "./Menus/Templates";
import Workspaces from "./Menus/Workspaces";
function AppBar() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? " #2c3e50" : "#1560c0",
      }}
    >
      <Stack
        display={"flex"}
        alignItems={"center"}
        direction={"row"}
        spacing={2}
      >
        <AppsIcon sx={{ color: "white" }} />
        <SvgIcon component={Logo} inheritViewBox sx={{ color: "white" }} />
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "Bold",
            color: "white",
          }}
        >
          {"Trello"}
        </Typography>
        <Stack
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Workspaces />
          <Recent />
          <Started />
          <Templates />
          <Button
            variant="outlined"
            startIcon={<LibraryAddIcon />}
            sx={{
              color: "white",
              border: "none",
              "&:hover": { border: "none" },
            }}
          >
            {"Create"}
          </Button>
        </Stack>
      </Stack>
      <Stack
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        spacing={2}
      >
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize="small"
                sx={{
                  color: searchValue ? "white" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setSearchValue("")}
              />
            ),
          }}
          sx={{
            minWidth: 120,
            "& label": {
              color: "white",
            },
            "& input": {
              color: "white",
            },
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              fieldset: {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
            <Notifications sx={{ color: "white" }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutline sx={{ cursor: "pointer" }} />
        </Tooltip>
        <Profiles />
      </Stack>
    </Box>
  );
}

export default AppBar;
