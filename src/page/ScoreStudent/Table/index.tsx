import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import Table from '@/components/ui/Table/Table';

function TableStudentScore(props: any) {
  const { handleRowClick, currentRowSelectId, rows } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Nhóm',
      field: 'topic',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Typography sx={{  fontWeight: '400' }} variant='h6'>
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
            color: 'success.main',
            bgcolor: '#CBF8E0 !important',
          },
        }}
        minHeight={300}
        rowHeight={50}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        getRowClassName={(params) => (params.id === currentRowSelectId ? 'Mui-selected' : '')}
        onRowClick={handleRowClick}
      />
    </>
  );
}

export default TableStudentScore;
