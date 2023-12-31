import { Box } from '@mui/material';
import React from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import Page from '@/components/Page';
import TopBar from '@/components/TopBar';
import UserForm from '@/components/UserForm';
import useUser from '@/hooks/useUser';

function Profile() {
  const { data } = useUser();

  const initialValues = {
    name: data?.name || "",
    email: data?.email || "",
    password: data?.password || "",
    confirmPassword: data?.password || "",
  }

  return (
    <>
      <TopBar config back />
      <Page sx={{ justifyContent: "center" }}>
        <Box sx={{ width: "min(700px, 100%)" }}>
          <UserForm initialValues={initialValues} />
        </Box>
      </Page >
    </>
  );
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

export default Profile;