import React from 'react';
import './Loading.css';
import { Box } from '@mui/material';

function Loading() {
  return (
    <Box className='loading-container'>
      <Box className='lds-dual-ring'>
        <img
          style={{ marginLeft: 28, marginBottom: 30 }}
          width={70}
          src='/public/images/logo-sm.jpg'
        />
      </Box>
    </Box>
  );
}

export default Loading;
