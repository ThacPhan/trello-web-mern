import {
  DarkModeOutlined,
  LightMode,
  SettingsBrightness,
} from "@mui/icons-material";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import "./App.css";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectMode = event.target.value;
    setMode(selectMode);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">{"Mode"}</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="demo-simple-select"
        value={mode}
        label="Mode"
        onChange={handleChange}
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

function App() {
  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ height: "100vh", backgroundColor: "primary.main" }}
      >
        <Box
          sx={{
            backgroundColor: "primary.light",
            width: "100%",
            height: (theme) => theme.trelloCustom.appBarHeight,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ModeSelect />
        </Box>
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
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: "100%",
            height: "calc(100% - 58px - 48px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {"Bord Content"}
        </Box>
      </Container>
    </>
  );
}

export default App;
