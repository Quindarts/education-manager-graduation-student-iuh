import { Box } from '@mui/material';
import { SnackbarContent, useSnackbar } from 'notistack';
import React from 'react';
import { ref } from 'yup';

function CustomVariantSnackbar(props: any) {
  const { closeSnackbar } = useSnackbar();
  const handleCloseSnackbar = () => closeSnackbar(id);
  const { id, message, allowDownload, image, ...other } = props;
  return (
    <SnackbarContent ref={ref} role='alert' {...other}>
      <Box>
        {message}
        <button className='cursor-pointer text-xl text-white' onClick={handleCloseSnackbar}>
          Close
        </button>
      </Box>
    </SnackbarContent>
  );
}

export default CustomVariantSnackbar;
