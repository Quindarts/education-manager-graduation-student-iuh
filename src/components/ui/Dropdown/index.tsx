import { BaseSelectProps, Box, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface SelectOption {
  name: string;
  _id: string;
}
interface SelectPropsType extends BaseSelectProps {
  error?: boolean;
  helperText?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: SelectOption[] | undefined;
}

const DropDown: React.FC<SelectPropsType> = (props: SelectPropsType) => {
  const { options, placeholder, id, label, required, error, helperText, ...restProps } = props;
  return (
    <Box>
      {label && (
        <InputLabel
          htmlFor={id}
          sx={{ mb: 3, color: 'grey.700', fontWeight: 600, fontSize: 12 }}
        >
          {label}
        </InputLabel>
      )}
      <Select
        variant='outlined'
        id={id}
        displayEmpty
        fullWidth
        {...restProps}
        sx={{
          transition: 'all 0.5s ease-in-out',
          background: 'white',
          height: 36,
        }}
      >
        {placeholder && (
          <MenuItem value=''>
            <span>{placeholder}</span>
          </MenuItem>
        )}

        {options &&
          options?.map((option: SelectOption) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
      </Select>
      {helperText && (
        <FormHelperText sx={{ color: 'error.main' }} error={error}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};
export default DropDown;
