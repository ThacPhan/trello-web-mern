import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: "65px",
    boardBarHeight: "60px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "0.5px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fieldset: {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "0.5px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "0.5px !important",
          },
        },
      },
    },
  },
});

export default theme;
