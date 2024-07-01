import { GridColDef } from '@mui/x-data-grid';
import {  Box, Typography } from '@mui/material';
import Table from '@/components/ui/Table/Table';
import { getCardTranscriptStatus } from '@/utils/validations/transcript.validation';

function TableStudentScore(props: any) {
  const { handleRowClick, currentRowSelectId, rows } = props;

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin sinh viên',
      field: 'name',
      flex: 0.7,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box gap={4} display={'flex'} alignItems={'center'}>
            <Box>
              <Typography fontWeight={600} variant='body1'>
                {params.row.fullName}
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
        return <Typography>{params.row.groupStudentName}</Typography>;
      },
    },
  //   {
  //     headerName: 'Trạng thái',
  //     field: 'status',
  //     flex: 0.4,
  //     headerAlign: 'center',
  //     align: 'center',
  //     renderCell: (params: any) => {
  //       return <>{getCardTranscriptStatus('REJECTED')}</>;
  //     },
  //   },
  ];
  return (
    <>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        getRowClassName={(params) => (params.id === currentRowSelectId ? 'Mui-selected' : '')}
        onRowClick={handleRowClick}
      />
    </>
  );
}

export default TableStudentScore;
