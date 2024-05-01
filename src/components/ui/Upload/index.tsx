import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import { Icon } from '@iconify/react';
import { Button, Typography } from '@mui/material';
import * as XLSX from 'xlsx';
import styled from '@emotion/styled';
import { enqueueSnackbar } from 'notistack';
const EXTENSIONS = ['xlsx', 'xls', 'csv'];

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
  const { ...rest } = props;
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [data, setData] = React.useState<Array<any>>([]);
  const [fileName, setFileName] = React.useState<string>('');
  //match xlsx, csv
  const getExention = (file: any) => {
    const parts = file.name.split('.');
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const importExcel = (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    setSuccess(false);
    setLoading(true);
    reader.onload = (event: any) => {
      const bstr = event?.target?.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });
      const workSheet = workBook.Sheets[`${workBook.SheetNames[0]}`];
      if (workSheet) {
        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        if (fileData) {
          setSuccess(true);
          setLoading(false);
          setData(fileData);
        }
      }
    };
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        enqueueSnackbar('File tải lên không đúng định dạng Excel, CSV file', {
          variant: 'error',
        });
      }
    } else {
      setData([]);
      enqueueSnackbar('Đã có lỗi khi tải lên, vui lòng thử lại sau...', {
        variant: 'error',
      });
    }
  };
  console.log('my data', data);
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
