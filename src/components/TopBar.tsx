import React, { useRef, useState } from "react";
import { AppBar, Box, IconButton, Menu, MenuItem, Select, SelectChangeEvent, SxProps, Typography } from "@mui/material";
import { ArrowBack, DarkMode, LightMode, Logout, Settings } from "@mui/icons-material";
import { US as FlagUS, BR as FlagBR } from 'country-flag-icons/react/3x2';

import useThemeStore from "@/store/useThemeStore";
import useLangStore from "@/store/useLangStore";
import { ThemeModeType } from "@/types/theme";
import { LangType } from "@/types/lang";
import { useRouter } from "next/router";
import useLogin from "@/hooks/useLogin";
import ConfigMenu, { ModalHandles } from "./ConfigMenu";

interface PropsType {
  config?: boolean,
  back?: boolean
}

const styleAppBar: SxProps = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  "h1": {
    fontSize: "2em",
    padding: "0.2em 0.3em",
    fontWeight: "bold"
  }
}

const TopBar = ({ config, back }: PropsType) => {
  const router = useRouter();

  const { theme, toggle } = useThemeStore();
  const { lang, setLang } = useLangStore();

  const modalRef = useRef<ModalHandles>(null);

  const themeMode: ThemeModeType = theme.palette.mode;

  function handleConfig(evt: React.MouseEvent<HTMLButtonElement>) {
    modalRef.current?.openModal(evt.currentTarget);
  }

  return (
    <AppBar sx={styleAppBar}>
      <Box sx={{ display: "flex" }}>
        {back && (
          <IconButton onClick={() => router.back()}>
            <ArrowBack sx={{ color: "white", marginLeft: "0.5em" }} />
          </IconButton>
        )}
        <Typography component="h1" sx={{ paddingLeft: back ? "" : "0.8em !important" }}>To-do</Typography>
      </Box>
      <Box>
        <IconButton onClick={toggle}>
          {
            themeMode === "light" ?
              (
                <DarkMode sx={{ color: "white" }} />
              ) : (
                <LightMode sx={{ color: "white" }} />
              )
          }
        </IconButton>
        <Select
          displayEmpty
          value={lang}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(evt: SelectChangeEvent) => setLang(evt.target.value as LangType)}
          renderValue={() => {
            return (
              <>
                {lang === "ptbr" ? (<FlagBR width={20} />) : (<FlagUS width={20} />)}
              </>
            )
          }}
        >
          <MenuItem value={"ptbr"}><FlagBR /></MenuItem>
          <MenuItem value={"en"}><FlagUS /></MenuItem>
        </Select>
        {config && (
          <IconButton onClick={handleConfig}>
            <Settings sx={{ color: "white" }} />
          </IconButton>
        )}
      </Box>
      <ConfigMenu ref={modalRef} />
    </AppBar >
  )
}

export default TopBar;