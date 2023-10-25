import { create } from "zustand"
import { Theme } from "@mui/material";

import dark from "@/themes/dark";
import light from "@/themes/light";
import { ThemeModeType } from "@/types/theme";

interface ThemeStoreType {
  theme: Theme;
  toggle: () => void;
  setTheme: (themeMode: ThemeModeType) => void;
}

function setTheme(set: any, themeMode: ThemeModeType) {
  set(() => {
    const newTheme = themeMode === "dark" ? dark : light;
    return {
      theme: newTheme
    };
  })
}

function toggleTheme(set: any) {
  set((state: any) => {
    const themeMode: ThemeModeType = state.theme.palette.mode;
    const newTheme = themeMode === "light" ? dark : light;
    localStorage.setItem("theme", newTheme.palette.mode);
    return {
      theme: newTheme
    }
  })
}

const useThemeStore = create<ThemeStoreType>((set) => ({
  theme: light,
  toggle: () => toggleTheme(set),
  setTheme: (themeMode: ThemeModeType) => setTheme(set, themeMode)
}));

export default useThemeStore