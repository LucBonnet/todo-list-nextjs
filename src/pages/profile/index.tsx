import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Page from '@/components/Page';
import TopBar from '@/components/TopBar';
import UserForm from '@/components/UserForm';
import useUser from '@/hooks/useUser';
import useUserStore from '@/store/useUserStore';


function Register() {
  const router = useRouter();
  const { userId, setUserId } = useUserStore();


  useEffect(() => {
    if (!userId) {
      const user = localStorage.getItem("user");
      if (user) setUserId(user)
      else router.push("/");
    }
  }, [userId]);

  const { data } = useUser(userId);

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
        <Box sx={{ width: "clamp(400px, 50%, 500px)" }}>
          <UserForm initialValues={initialValues} />
        </Box>
      </Page >
    </>
  );
}

export default Register;