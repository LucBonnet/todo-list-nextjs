import { FormControlLabel } from '@mui/material';
import { Checkbox, CheckboxProps } from 'formik-mui';
import React from 'react';

interface PropsType extends CheckboxProps {
  label: string
}

function CustomCheckbox(props: PropsType) {
  return (
    <FormControlLabel
      control={
        <Checkbox {...props} />
      }
      label={props.label}
    />
  );
}

export default CustomCheckbox;