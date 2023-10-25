import useThemeStore from '@/store/useThemeStore';
import { Close } from '@mui/icons-material';
import { Alert, Box, Dialog, DialogContent, IconButton, Snackbar, useMediaQuery } from '@mui/material';

import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface PropsType {
  message: string,
  setAnswer: (answer: string) => void
}

function ModalConfirmDelete(props: PropsType, ref: any) {
  const { theme } = useThemeStore();
  const [open, setOpen] = useState<boolean>(false);

  const { message, setAnswer } = props;

  useImperativeHandle(ref, (): any => ({
    openModal: () => {
      setOpen(true);
    }
  }));

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent>
        {message}
        <Box>
          <IconButton color="error">

          </IconButton>
          <IconButton color="primary">

          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default forwardRef(ModalConfirmDelete);