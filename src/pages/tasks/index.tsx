import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import TopBar from "@/components/TopBar";
import Page from "@/components/Page";
import { FormLabel, Table, TableBody, TableCell, Checkbox, TableContainer, TableRow, IconButton, Button, Box, Typography, SxProps } from '@mui/material';
import { TaskType } from '@/types/task';
import useTask from '@/hooks/useTask';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useRef, useState } from 'react';
import ModalTask from '@/components/ModalTask';
import { ModalHandles } from '@/types/modal';
import { useTranslation } from 'react-i18next';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Home() {
  const modalRef = useRef<ModalHandles>(null);
  const [updateInitialValues, setUpdateInitialValues] = useState<{ id: string, title: string }>();

  const { t } = useTranslation();

  const { data, deleteTask, toggleTask } = useTask();

  function handleOpenCreateModal() {
    setUpdateInitialValues(undefined);
    modalRef.current?.openModal();
  }

  function handleOpenUpdateModal(task: TaskType) {
    setUpdateInitialValues({ id: task.id, title: task.title });
    modalRef.current?.openModal();
  }

  const styleTaskChecked: SxProps = {
    textDecoration: "line-through",
    color: "text.paper"
  }

  return (
    <>
      <TopBar config />
      <Page sx={{ paddingTop: "5em" }}>
        <Box sx={{ width: "min(700px, 100%)" }}>
          <Button onClick={handleOpenCreateModal} variant='contained' >
            <Add /> {t("btnAdd")}
          </Button>
          <TableContainer>
            <Table>
              <TableBody>
                {data.map((task: TaskType) => (
                  <TableRow key={task.id} sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
                    <TableCell>
                      <Checkbox
                        id={`taskIsCompleted${task.id}`}
                        checked={task.checked}
                        onChange={() => toggleTask(task.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                      <FormLabel htmlFor={`taskIsCompleted${task.id}`}>
                        <Typography sx={task.checked ? styleTaskChecked : { color: "text.primary" }}>
                          {task.title}
                        </Typography>
                      </FormLabel>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenUpdateModal(task)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => deleteTask(task.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ModalTask
          initialValues={updateInitialValues}
          ref={modalRef}
        />
      </Page>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nexttodo.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}