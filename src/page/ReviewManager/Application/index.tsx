import UploadFileExcel from '@/components/ui/UploadExcel';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { Box, Button } from '@mui/material';
import React from 'react';

function Application() {
  return (
    <Box my={4} display={'flex'} gap={6}>
      <UploadFileExcel
        entityUpload={TypeEntityUpload.EVALUATION}
        fileNameModel='Mẫu file excel tiêu chí đánh giá KLTN'
        sheetName='tiêu chí'
        title='Tải xuống mẫu file'
      />
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
