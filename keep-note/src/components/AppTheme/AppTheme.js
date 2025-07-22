import { createTheme } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";

const theme = createTheme({
  mode: "light",
  palette: {
    type: "light",
    spacing: 4,
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#28282b",
    },
    status: {
      success: green,
      warn: red[700],
    },
    background: {
      default: "#f5ffff",
      paper: "#eeeade",
    },
  },
});

export { theme };
