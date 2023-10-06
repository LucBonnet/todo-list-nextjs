import { Close } from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';

import React, { forwardRef, useImperativeHandle, useState } from 'react';

export interface MessageType {
  severity?: "error" | "info" | "success" | "warning",
  time?: number,
  message: string
}

interface PropsType {
  infos: MessageType
}

function ModalMessage(props: PropsType, ref: any) {
  const [open, setOpen] = useState<boolean>(false);
  const message = props.infos.message;
  const severity = props.infos.severity ? props.infos.severity : "success";
  const time = props.infos.time ? props.infos.time : 3000;

  useImperativeHandle(ref, (): any => ({
    openModal: () => {
      setOpen(true);
    }
  }));

  return (
    <Snackbar open={open} autoHideDuration={time} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default forwardRef(ModalMessage);