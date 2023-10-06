import styled from "@emotion/styled";
import { Form } from "formik";

const CustomForm = styled(Form)((theme) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "2em",

    "button.form-button": {
      marginTop: "1em",
      width: "100%",
    },

    ".form-title": {
      width: "100%",
      fontWeight: "bold",
      fontSize: "1.5em"
    }
  }
})

export default CustomForm;