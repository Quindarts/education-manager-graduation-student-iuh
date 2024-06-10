import { Box, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface TextEditorPropsType extends ReactQuillProps {
  label?: string;
  handleSetValue: (value: string) => void;
  value: string;
}
function TextEditor(props: TextEditorPropsType) {
  const { label, handleSetValue, value, ...rest } = props;
  return (
    <Box>
      {label && <InputLabel sx={{ color: 'grey.900', fontWeight: 600, mb: 2 }}>{label}</InputLabel>}
      <ReactQuill {...rest} theme='snow' value={value} onChange={handleSetValue} />
    </Box>
  );
}

export default TextEditor;
