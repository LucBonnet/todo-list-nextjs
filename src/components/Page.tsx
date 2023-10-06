import { Container, ContainerOwnProps, styled } from "@mui/material";

const Page = styled(Container)((props) => {
  return {
    width: "100dvw",
    height: "100dvh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    background: "",
  }
})

export default Page;