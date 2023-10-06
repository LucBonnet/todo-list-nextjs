import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { Field, Formik } from 'formik';
import React from 'react';

import Page from '@/components/Page';
import TopBar from '@/components/TopBar';
import UserForm from '@/components/UserForm';


function Register() {
  return (
    <>
      <TopBar back />
      <Page sx={{ justifyContent: "center" }}>
        <Box sx={{ width: "clamp(400px, 50%, 500px)" }}>
          <UserForm />
        </Box>
        {/* <Snackbar
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
        </Snackbar> */}
      </Page >
    </>
  );
}

export default Register;