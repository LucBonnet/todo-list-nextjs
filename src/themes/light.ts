import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#fff",
    },
    primary: {
      main: "#0E7C7B",
    },
  }
})

export default lightTheme;