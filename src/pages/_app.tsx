import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import useThemeStore from '@/store/useThemeStore';
import useLangStore from '@/store/useLangStore';
import { ThemeModeType } from "@/types/theme";
import { LangType } from "@/types/lang";
import "@/i18n/config";

export default function App({ Component, pageProps }: AppProps) {
  const { theme, setTheme } = useThemeStore();
  const { setLang } = useLangStore();

  useEffect(() => {
    const themeMode = localStorage.getItem("theme") as ThemeModeType;
    if (themeMode) setTheme(themeMode);

    const language = localStorage.getItem("lang") as LangType;
    if (language) setLang(language)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
