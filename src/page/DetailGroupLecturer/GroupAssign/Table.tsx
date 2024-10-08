import Table from '@/components/ui/Table/Table';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

const LecturerColumns: GridColDef[] = [
  {
    headerName: 'Mã nhóm',
    field: 'name',
    flex: 0.7,
    headerAlign: 'center',
    align: 'center',
  },
  {
    headerName: 'Giảng viên hướng dẫn',
    field: 'lecturerName',
    flex: 1.5,
    headerAlign: 'left',
  },
  {
    headerName: 'Tên đề tài',
    field: 'topicName',
    flex: 4,
    align: 'left',
    headerAlign: 'left',
  },
  {
    headerName: 'Thành viên',
    field: 'nam',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: any) => {
      return (
        <Box>
          {params?.row?.members?.map((mem: any) => (
            <Typography variant='body1' color='initial'>
              {mem?.username} - {mem?.fullName}
            </Typography>
          ))}
        </Box>
      );
    },
  },
];
const HeadLecturerColumns: GridColDef[] = [
  {
    headerName: 'Mã nhóm',
    field: 'name',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    headerName: 'Tên đề tài',
    field: 'topicName',
    flex: 2.5,
    align: 'left',
    headerAlign: 'left',
  },
  {
    headerName: 'Giảng viên hướng dẫn',
    field: 'lecturerName',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
  },

  {
    headerName: 'Thành viên',
    field: 'degree',
    flex: 1.4,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params: any) => {
      return (
        <Box>
          {params?.row?.members?.map((mem: any) => (
            <Typography variant='body1' color='initial'>
              {mem?.username} - {mem?.fullName}
            </Typography>
          ))}
        </Box>
      );
    },
  },
];

function TableManagementGroupAssign(props: any) {
  const { rows } = props;
  const { handleUiRender } = useGroupLecturer();
  const currentRole = handleUiRender();
  return (
    <>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        minHeight={400}
        rowHeight={70}
        columns={currentRole.includes('all') ? HeadLecturerColumns : LecturerColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </>
  );
}

export default TableManagementGroupAssign;
