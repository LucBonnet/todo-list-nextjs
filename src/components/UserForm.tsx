import { Field, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import Form from "@/components/Form";
import CustomTextField from '@/components/CustomTextField';
import PasswordTextField from '@/components/PasswordTextField';
import { Box, Button, Typography } from '@mui/material';
import useUser from '@/hooks/useUser';
import useUserStore from '@/store/useUserStore';
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import ModalMessage, { MessageType } from './ModalMessages';
import { ModalHandles } from '@/types/modal';
import { useRouter } from 'next/router';

interface ValuesType {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface PropsType {
  initialValues?: ValuesType,
}

const resetedForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

function UserForm(props: PropsType) {
  const { userId, setUserId } = useUserStore();
  const { createUser, updateUser, deleteUser } = useUser();
  const router = useRouter();

  const modalRef = useRef<ModalHandles>(null);

  const [messageInfos, setMessageInfos] = useState<MessageType>({ message: "" });

  const { t } = useTranslation();

  const initialValues = props.initialValues ? props.initialValues : resetedForm;
  const update = Boolean(initialValues.name);

  const userSchemaCreate = yup.object().shape({
    name: yup
      .string()
      .min(3, "O nome deve conter mais de 3 caracteres")
      .required(t("errRequired")),
    email: yup
      .string()
      .email(t("errInvalidEmail"))
      .required(t("errRequired")),
    password: yup
      .string()
      .min(4, "A senha deve conter no mínimo 4 caracteres")
      .required(t("errRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
      .required(t("errRequired")),
  });

  const userSchemaUpdate = yup.object().shape({
    name: yup
      .string()
      .min(3, "O nome deve conter mais de 3 caracteres")
      .required(t("errRequired")),
    email: yup
      .string()
      .email(t("errInvalidEmail"))
      .required(t("errRequired")),
  });

  async function handleSubmitForm(values: ValuesType, actions: FormikHelpers<ValuesType>) {
    if (!update) {
      const resp = await createUser(values);
      if (!resp.success) {
        setMessageInfos({ message: resp.error, severity: "error" });
        modalRef.current?.openModal();
      } else {
        setMessageInfos({ message: "Usuário cadastrado com sucesso", severity: "success" });
        modalRef.current?.openModal();
        actions.resetForm();
      }
    } else {
      const resp = await updateUser(userId, values);
      if (!resp.success) {
        setMessageInfos({ message: resp.error, severity: "error" });
        modalRef.current?.openModal();
      } else {
        setMessageInfos({ message: "Perfil atualizado com sucesso", severity: "success" });
        modalRef.current?.openModal();
        actions.resetForm({ values });
      }
    }
  }

  async function handleDeleteUser() {
    const resp = await deleteUser();
    if (!resp.success) {
      setMessageInfos({ message: resp.error, severity: "error" });
      modalRef.current?.openModal();
    } else {
      setUserId("");
      localStorage.removeItem("user");
      router.push("/");
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={update ? userSchemaUpdate : userSchemaCreate}
    >
      <Form>
        <Typography className="form-title">
          {update ? t("tlProfile") : t("tlRegister")}
        </Typography>
        <Field
          name="name"
          type="name"
          label={t("lblName")}
          component={CustomTextField}
          variant="outlined"
        />
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
        <Field
          name="confirmPassword"
          label={t("lblConfirmPassword")}
          component={PasswordTextField}
          variant="outlined"
        />


        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "2em" }}>
          {
            update && (
              <Button
                className="form-button"
                type="submit"
                color="error"
                variant='outlined'
                onClick={handleDeleteUser}
              >
                {t("btnDeleteProfile")}
              </Button>
            )
          }
          <Button className="form-button" type="submit" variant="contained" >
            {
              update ? t("btnUpdate") : t("btnRegister")
            }
          </Button>
        </Box>
        <ModalMessage
          infos={messageInfos}
          ref={modalRef}
        />
      </Form>
    </Formik>
  );
}

export default UserForm;