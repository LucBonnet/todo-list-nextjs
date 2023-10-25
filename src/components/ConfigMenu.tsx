import { AuthContext } from '@/context/AuthContext';
import { AccountCircle, Logout } from '@mui/icons-material';
import { Menu, MenuItem, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ModalHandles {
  openModal: (anchor: Element) => {};
}

const menuItemStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  gap: "1em",
}

function ConfigMenu(props: any, ref: any) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();

  const router = useRouter();
  const { signOut } = AuthContext();

  const { t } = useTranslation();

  useImperativeHandle(ref, (): any => ({
    openModal: (anchor: Element) => {
      setAnchorEl(anchor);
      setOpen(true);
    }
  }));


  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={() => setOpen(false)}
      sx={{ marginTop: "0.6em" }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem sx={menuItemStyle} onClick={() => { router.push("/profile") }}>
        <AccountCircle />
        <Typography>
          {t("tlProfile")}
        </Typography>
      </MenuItem>
      <MenuItem sx={menuItemStyle} onClick={() => { signOut() }}>
        <Logout />
        <Typography>
          {t("lblExit")}
        </Typography>
      </MenuItem>
    </Menu>
  );
}

export default forwardRef(ConfigMenu);