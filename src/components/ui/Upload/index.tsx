import * as React from 'react';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import { Icon } from '@iconify/react';
import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import useUploadExcel from '@/hooks/ui/useUploadExcel';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  backgroundColor: 'red',
});
function UploadFileExcel(props: any) {
  const { setCurrentData, ...rest } = props;
  const { importExcel, success, data, loading, fileName } = useUploadExcel();
  console.log('🚀 ~ UploadFileExcel ~ data:', data);
  if (success) {
    setCurrentData(data);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box {...rest} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Button
            component='label'
            variant='contained'
            size='small'
            fullWidth
            sx={{
              position: 'relative',
              ...(success && {
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.dark',
                },
              }),
            }}
            disabled={loading}
          >
            {success ? <CheckIcon /> : <Icon width={24} icon='line-md:upload-outline-loop' />}
            Tải file lên
            <VisuallyHiddenInput type='file' onChange={(e) => importExcel(e)} />
          </Button>
        </Box>
      </Box>
      <Box display={'flex'}>
        {success && (
          <Typography color='success.main' variant='h6'>
            <Icon width={20} icon='vscode-icons:file-type-excel' />
            File: {fileName}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default UploadFileExcel;
