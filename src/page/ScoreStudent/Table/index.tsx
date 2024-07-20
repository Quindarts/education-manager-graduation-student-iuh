import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import Table from '@/components/ui/Table/Table';

function TableStudentScore(props: any) {
  const { handleRowClick, currentRowSelectId, rows } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Nhóm Sinh viên',
      field: 'topic',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Typography sx={{ textTransform: 'uppercase', fontWeight: '600' }} variant='body1'>
            {params.row.name}
          </Typography>
        );
      },
    },
  ];
  return (
    <>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
          '&  .Mui-selected': {
            color: 'error.main',
            bgcolor: '#f8d2cb !important',
          },
        }}
        minHeight={300}
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
