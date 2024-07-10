import {
  DarkModeOutlined,
  LightMode,
  SettingsBrightness,
} from "@mui/icons-material";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectMode = event.target.value;
    setMode(selectMode);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: "white",
          "&.Mui-focused": { color: "white" },
        }}
      >
        {"Mode"}
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="demo-simple-select"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: "white",
          ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          ".MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LightMode />
            {"Light"}
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeOutlined />
            {"Dark"}
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightness />
            {"System"}
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
