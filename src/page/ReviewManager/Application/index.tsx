import UploadFileExcel from '@/components/ui/Upload';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';

function Application() {
  const [currentData, setCurrentData] = useState([]);
  console.log('🚀 ~ Application ~ currentData:', currentData);
  return (
    <Box my={4} display={'flex'} gap={6}>
      <UploadFileExcel setCurrentData={setCurrentData} />
      <Button variant='contained' color='warning'>
        Xuất phiếu chấm
      </Button>
      <Button variant='contained' color='error'>
        Xóa nhiều tiêu chí
      </Button>
      <Button variant='contained' color='success'>
        Lưu
      </Button>
    </Box>
  );
}

export default Application;
