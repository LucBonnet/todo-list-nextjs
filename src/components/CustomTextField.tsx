import { styled } from "@mui/material";
import { TextField } from "formik-mui";

const CustomTextField = styled(TextField)(({ theme }) => {
  return {
    width: "100%"
  }
});

export default CustomTextField;