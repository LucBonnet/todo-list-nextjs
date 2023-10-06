import { Field, Formik, FormikHelpers } from "formik";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as yup from "yup";

import useLogin from "@/hooks/useLogin";
import CustomTextField from "@/components/CustomTextField";
import PasswordTextField from "@/components/PasswordTextField";
import Form from "@/components/Form";
import TopBar from "@/components/TopBar";
import Page from "@/components/Page";
import CustomCheckbox from "@/components/CustomCheckbox";
import useUserStore from "@/store/useUserStore";
import { useTranslation } from "react-i18next";

interface ValuesType {
  email: string,
  password: string,
  rememberLogin: boolean
}

interface SnackbarInfosType {
  severity: "error" | "warning" | "info" | "success" | undefined,
  message: string | undefined,
  open: boolean;
}

export default function Home() {
  const { userId, setUserId } = useUserStore();
  const router = useRouter();
  const { login } = useLogin();
  const { t } = useTranslation();

  const [snackbarInfos, setSnackbarInfos] = useState<SnackbarInfosType>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/tasks")
      setUserId(user)
    }
  }, [userId])

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("errInvalidEmail"))
      .required(t("errRequired")),
    password: yup
      .string()
      .required(t("errRequired"))
  });

  async function onSubmitForm(values: ValuesType, actions: FormikHelpers<ValuesType>) {
    const resp = await login(values);
    if (resp?.success) {
      router.push("/tasks");
    } else {
      setSnackbarInfos({
        message: resp?.error,
        severity: "error",
        open: true
      })
    }
  }

  return (
    <>
      <TopBar />
      <Page sx={{ justifyContent: "center" }}>
        <Box sx={{ width: "clamp(400px, 50%, 500px)" }}>
          <Formik
            initialValues={{ email: "", password: "", rememberLogin: false }}
            validationSchema={loginSchema}
            onSubmit={onSubmitForm}
          >
            <Form>
              <Typography className="form-title">Login</Typography>
              <Field
                name="email"
                type="email"
                label={t("lblEmail")}
                component={CustomTextField}
                variant="outlined"
              />
              <Field
                name="password"
                label={t("lblPassword")}
                component={PasswordTextField}
                variant="outlined"
              />
              <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Field
                  name="rememberLogin"
                  type="checkbox"
                  label={t("lblRememberMe")}
                  component={CustomCheckbox}
                  variant="outlined"
                />
                <Link href="/register">{t("lblSignup")}</Link>
              </Box>
              <Button
                className="form-button"
                variant="contained"
                type="submit"
              >
                {t("btnLogin")}
              </Button>
            </Form>
          </Formik>
        </Box>
        <Snackbar
          open={snackbarInfos?.open}
          autoHideDuration={3000}
          onClose={() => setSnackbarInfos({ message: snackbarInfos?.message, severity: snackbarInfos?.severity, open: false })}
        >
          <Alert
            onClose={() => setSnackbarInfos({ message: snackbarInfos?.message, severity: snackbarInfos?.severity, open: false })}
            severity={snackbarInfos?.severity}
            sx={{ width: '100%' }}
          >
            {snackbarInfos?.message}
          </Alert>
        </Snackbar>
      </Page>
    </>
  )
}
