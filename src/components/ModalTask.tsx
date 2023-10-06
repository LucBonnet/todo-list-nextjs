import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Typography, IconButton, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Close, Add, Edit } from "@mui/icons-material";
import { Field, Formik, FormikHelpers } from 'formik';
import * as yup from "yup";

import Form from "@/components/Form";
import CustomTextField from './CustomTextField';
import useTask from '@/hooks/useTask';
import useUserStore from '@/store/useUserStore';

interface ValuesType {
  title: string,
}

interface PropsType {
  initialValues?: {
    title: string,
    id: string
  }
}

function ModalTask(props: PropsType, ref: any) {
  const { userId } = useUserStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { createTask, updateTask } = useTask(userId);

  const { t } = useTranslation();

  const initialValues = {
    title: props.initialValues?.title || ""
  }
  const update = Boolean(initialValues.title);

  useImperativeHandle(ref, (): any => ({
    openModal: () => {
      setIsOpen(true);
    }
  }));

  const taskSchema = yup.object().shape({
    title: yup
      .string()
      .min(3, t("errMin3"))
      .required(t("errRequired"))
  });

  async function handleSubmit(values: ValuesType, actions: FormikHelpers<ValuesType>) {
    if (!update) {
      await createTask(values.title, userId);
    } else {
      const taskId = props.initialValues?.id;
      if (taskId)
        await updateTask(taskId, values.title);
    }
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="task"
      aria-describedby="create and update task"
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1em" }}>
        <Typography id="modal-modal-title" variant="h6" component="p">
          {update ? t("tlUpdateTask") : t("tlAddTask")}
        </Typography>
        <IconButton
          onClick={() => setIsOpen(false)}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={taskSchema}
          onSubmit={handleSubmit}
        >
          <Form style={{ marginTop: "0.5em" }}>
            <Field
              name="title"
              label={t("lblTitle")}
              component={CustomTextField}
              variant="outlined"
            />
            <Button type="submit" variant="contained">
              {
                update ? (
                  <><Edit /> {t("btnUpdate")}</>
                ) : (
                  <><Add />{t("btnAdd")}</>
                )
              }
            </Button>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog >
  );
}

export default forwardRef(ModalTask);