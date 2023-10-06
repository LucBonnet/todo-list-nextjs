import React, { useState } from 'react';
import { Menu, MenuItem } from "@mui/material";

function SettingsMenu(props: any) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState();

  return (
    <Menu
      open={menuIsOpen}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }
      }
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorEl={anchorEl}

    >
      <MenuItem>Ola </MenuItem>
    </Menu>
  );
}

export default SettingsMenu;