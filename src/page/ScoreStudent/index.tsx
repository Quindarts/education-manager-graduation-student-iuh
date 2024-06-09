import ScoreInput from '@/components/ui/ScoreInput';
import Table from '@/components/ui/Table/Table';
import TitleManager from '@/components/ui/Title';
import { dummyStudentData } from '@/dummy';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { GridColDef, GridExpandMoreIcon } from '@mui/x-data-grid';
import React, { useState } from 'react';
function ScoreStudentPage() {
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin sinh viên',
      field: 'name',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box gap={4} display={'flex'} alignItems={'center'}>
            <Avatar sizes='small' src={params.row.avatar} />
            <Box>
              <Typography fontWeight={600} variant='body1'>
                {params.row.name}
              </Typography>
              <Typography>
                Mã SV: {'  '}
                <Typography component={'span'}>{params.row.username}</Typography>
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      headerName: 'Nhóm',
      field: 'groupId',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return <Typography>1</Typography>;
      },
    },
  ];
  const [currentDataRow, setCurrentDataRow] = useState(null);
  const [currentRowSelectId, setCurrentRowSelectId] = useState('');

  const handleRowClick = (params: any) => {
    setCurrentDataRow(params.row);
    setCurrentRowSelectId(params.id);
  };
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      {/* <Accordion sx={{ px: 10 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon color='primary' />}
          aria-controls='panel-topic-content'
          id='panel-topic-header'
        >
          <Typography variant='h6' fontWeight={600}>
            Chấm điểm hướng dẫn
          </Typography>
        </AccordionSummary>
        <AccordionDetails> */}
      <TitleManager mb={14} mt={2}>
        Chấm điểm hội đồng
      </TitleManager>

      <Box display='flex' gap={10} pb={4}>
        {/* <Stack spacing={1}>
                  <LinearProgress />
                  <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                  <Skeleton variant='rectangular' height={60} />
                  <Skeleton variant='rounded' height={60} />
                </Stack> */}
        <Box width={400}>
          <Box display={'flex'} justifyContent={'space-between'}>
            {/* <Typography fontWeight={600} color='primary' variant='h5'>
              Danh sách sinh viên chưa chấm điểm
            </Typography> */}
            {/* <MenuButton /> */}
          </Box>
          <Table
            rows={dummyStudentData}
            sx={{
              bgcolor: 'white',
            }}
            columns={basicColumns}
            totalItems={1}
            totalPages={1}
            page={1}
            handelChangePage={() => {}}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            getRowClassName={(params) => (params.id === currentRowSelectId ? 'Mui-selected' : '')}
            onRowClick={handleRowClick}
          />
        </Box>
        <Paper sx={{ px: 4, flex: 1, pt: 10, height: 540 }}>
          {!currentDataRow ? (
            <Box display={'flex'} sx={{ cursor: 'progress' }} flexDirection={'column'} height={500}>
              <LinearProgress />
              <Box display={'flex'} flexDirection={'column'} gap={10} alignItems={'center'}>
                <Typography color='primary.main' variant='h6' mt={20} fontWeight={600}>
                  Vui lòng Chọn sinh viên chấm điểm ....
                </Typography>
                <Icon color='#dfdfdf' width={200} icon='streamline:search-visual' />
              </Box>
            </Box>
          ) : (
            <>
              <Typography color='primary.main' variant='h6' fontWeight={600}>
                Tên sinh viên: Lê Minh Quang
              </Typography>
              <Typography color='primary.main' variant='body1' fontWeight={400}>
                Nhóm Dề tài 1
              </Typography>
              <Box
                mt={20}
                mb={10}
                display={'flex'}
                justifyContent={'center'}
                flexWrap={'wrap'}
                gap={8}
              >
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='20'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='20'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='5'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='20'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='5'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='12'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='20'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='20'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='5'
                />
                <ScoreInput
                  sx={{ width: 'calc(50% - 10px)' }}
                  name='Đánh giá khả năng ứng dụng vào thực tế'
                  scoreMax='12'
                />
              </Box>
              <Box>
                <Typography
                  textAlign={'start'}
                  mr={20}
                  fontWeight={'bold'}
                  color={'primary'}
                  variant='h6'
                >
                  Tổng điểm :
                  <Typography color='red' variant='h5' fontWeight={600} component={'span'}>
                    10 / 100{' '}
                  </Typography>
                </Typography>
              </Box>
              <Box display={'flex'} justifyContent={'end'} mt={6}>
                <Button color='error' variant='contained'>
                  <Icon width={20} icon='dashicons:saved' style={{ marginRight: 2 }} />
                  Lưu điểm
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
      {/* </AccordionDetails>
      </Accordion>
      <Accordion sx={{ px: 10 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon color='primary' />}
          aria-controls='panel-topic-content'
          id='panel-topic-header'
        >
          <Typography variant='h6' fontWeight={600}>
            Chấm phản biện
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box pb={8}>
            <Stack spacing={1}>
              <LinearProgress />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='rectangular' height={60} />
              <Skeleton variant='rounded' height={60} />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ px: 10 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon color='primary' />}
          aria-controls='panel-topic-content'
          id='panel-topic-header'
        >
          <Typography variant='h6' fontWeight={600}>
            Chấm hội đồng
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box pb={8}>
            <Stack spacing={1}>
              <LinearProgress />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='rectangular' height={60} />
              <Skeleton variant='rounded' height={60} />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion> */}
    </Paper>
  );
}

export default ScoreStudentPage;
