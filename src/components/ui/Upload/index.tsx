import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import {
  Box,
  Button,
  Card,
  LinearProgress,
  LinearProgressProps,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import TitleManager from '../Title';
import styled from '@emotion/styled';
import useUploadExcel, { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '100%',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: '100%',
  backgroundColor: 'red',
});
interface ModalUploadPropsType {
  entityUpload: TypeEntityUpload;
  termId?: string;
  typeEvaluation?: string;
  disabled?: boolean;
  majorId?: string;
}

function ModalUpload(props: ModalUploadPropsType) {
  const { entityUpload, typeEvaluation, disabled = false } = props;
  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  const [isOpen, setIsOpen] = useState(false);
  const {
    importExcel,
    valueLoading,
    totalSize,
    currentFile,
    savedFileToDatabase,
    setFileName,
    setTotalSize,
    setCurrentFile,
    setValueLoading,
    fileName,
  } = useUploadExcel(
    entityUpload,
    termStore.currentTerm.id,
    majorStore.currentMajor.id,
    typeEvaluation,
  );

  const handleOpenUpload = () => {
    setIsOpen(true);
  };
  const handleCloseUpload = () => {
    setIsOpen(false);
    handleClearData();
  };
  const handleClearData = () => {
    setFileName('');
    setTotalSize('');
    setValueLoading('');
    setCurrentFile(undefined);
  };
  return (
    <Box>
      <Tooltip arrow title={!disabled ? '' : 'Danh sách tiêu chí trống, tải lên ngay'}>
        <Button disabled={disabled} onClick={handleOpenUpload} variant='contained' color='primary'>
          <Icon icon='uiw:file-excel' style={{ marginRight: 2 }} width={20} />
          Tải lên file excel mới
        </Button>
      </Tooltip>
      <Modal maxWidth={'sm'} open={isOpen} onClose={handleCloseUpload}>
        <Paper sx={{ px: 10, py: 6 }} elevation={3}>
          <Box display={'flex'} gap={4}>
            <Icon width={26} icon='vscode-icons:file-type-excel2' />
            <TitleManager>Tải File Excel</TitleManager>
          </Box>
          <Paper elevation={1} sx={{ px: 10, py: 12, mb: 6 }}>
            <Box
              sx={{ border: 2, borderColor: 'primary.main', borderRadius: 1 }}
              style={{
                borderStyle: 'dashed',
              }}
            >
              <Button
                component='label'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  py: 20,
                }}
              >
                <VisuallyHiddenInput type='file' onChange={(e) => importExcel(e)} />

                <Box
                  bgcolor='rgb(0,82,177,0.2)'
                  p={10}
                  borderRadius={'50%'}
                  width={100}
                  height={100}
                >
                  <Icon
                    color='rgb(0,82,177,0.7)'
                    width={'full'}
                    height={'full'}
                    icon='line-md:uploading-loop'
                  />
                </Box>
                <Typography fontWeight={500} color='primary.main' variant='h5'>
                  <Icon style={{ marginRight: 2 }} icon='fxemoji:warningsign' />
                  Chưa có file,tải lên ngay !
                </Typography>
              </Button>
            </Box>
          </Paper>
          <Box>
            {currentFile !== undefined ? (
              <Card sx={{ p: 6, borderRadius: 2, bgcolor: 'rgb(0,82,177,0.1)' }}>
                <Box gap={2} alignItems={'center'} display={'flex'}>
                  <Icon width={26} icon='subway:file-13' color='rgb(0,82,177,0.8)' />
                  <Box width={320}>
                    <Typography variant='body1' color='initial'>
                      Tên file:{fileName}
                    </Typography>
                    <Typography variant='body1' color='initial'>
                      Kích thước: {totalSize}
                    </Typography>
                  </Box>
                  <Box>
                    <Button onClick={() => savedFileToDatabase(currentFile)}>
                      <Icon width={20} style={{ marginRight: 10 }} icon='iconoir:db-check' />
                      Lưu vào hệ thống
                    </Button>
                  </Box>
                </Box>
                <LinearProgressWithLabel value={valueLoading * 100} />
                {valueLoading === 1 && (
                  <Typography textAlign={'end'} variant='h6' fontWeight={700} color='success.main'>
                    Lưu thành công
                    <Icon icon='mdi:tick-outline' width={18} />
                  </Typography>
                )}
              </Card>
            ) : (
              <Skeleton />
            )}
          </Box>

          <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
            <Button variant='contained' color='warning' onClick={handleClearData}>
              <Icon icon='pajamas:clear-all' />
              Làm mới
            </Button>
            <Button variant='contained' color='primary' onClick={handleCloseUpload}>
              <Icon icon='mdi:close-outline' />
              Thoát
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}

export default ModalUpload;
