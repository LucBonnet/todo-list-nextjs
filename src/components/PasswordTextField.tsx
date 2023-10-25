import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextFieldProps } from 'formik-mui';
import { Box, IconButton, InputAdornment, InputLabel, OutlinedInput, SxProps } from '@mui/material';
import CustomTextField from './CustomTextField';

const iconButtonStyle: SxProps = {
  position: "absolute",
  top: "0.35em",
  right: "1em"
}

function PasswordTextField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <CustomTextField
        type={showPassword ? "text" : "password"}
        sx={{
          "input::-ms-reveal, input::-ms-clear": {
            display: "none",
          }
        }}
        {...props}
      />
      <IconButton
        sx={iconButtonStyle}
        aria-label="mudar a visibilidade do campo de senha"
        onMouseDown={() => setShowPassword(!showPassword)}
        // onMouseUp={() => setShowPassword(false)}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </Box>
  );
}

export default PasswordTextField;