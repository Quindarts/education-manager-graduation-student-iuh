import { Box, InputLabel, FormControl, FormLabel, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface TextEditorPropsType extends ReactQuillProps {
  label?: string;
  handleSetValue?: (value: string) => void;
  value: string;
  errors?: boolean;
  helperText?: string;
}
function TextEditor(props: TextEditorPropsType) {
  const { label, handleSetValue, id, value, errors, helperText, ...rest } = props;
  return (
    <FormControl sx={{ width: '100%' }}>
      {label && <FormLabel sx={{ color: 'grey.900', fontWeight: 600, mb: 2 }}>{label}</FormLabel>}
      <ReactQuill
        {...rest}
        theme='snow'
        id={id}
        style={{ border: errors ? '1px solid #fb605d' : '', borderRadius: 6 }}
        value={`${value}`}
      />
      {errors && <FormHelperText sx={{ color: 'error.main' }}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default TextEditor;
