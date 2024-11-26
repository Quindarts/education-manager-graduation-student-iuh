import TextEditor from '@/components/ui/TextEditor';
// import { exportClass, useExportClass, useExportExcelJs } from '@/hooks/ui/useExportExcel';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Toolconvert() {
  const [string, setString] = useState<string>('');
  return (
    <Box p={10}>
      <Box>
        {/* <button onClick={() => exportClass()}>click me</button> */}
        <TextEditor
          label='Nhập vào đoạn text muốn convert'
          onChange={(value: string) => setString(value)}
          value={string}
          id='target'
          placeholder='Nhập vào mục tiêu đề tài'
        />{' '}
      </Box>
      <Box py={10}>
        <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
          Convert sang html
        </Typography>
        <Box
          borderRadius={4}
          p={10}
          sx={{ border: '2px solid #d0c8c8', width: '100%', height: '90vh' }}
        >
          {string}
        </Box>
      </Box>
    </Box>
  );
}

export default Toolconvert;
