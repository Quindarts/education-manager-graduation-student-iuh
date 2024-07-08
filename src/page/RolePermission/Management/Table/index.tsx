import Table from '@/components/ui/Table/Table';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { checkGender } from '@/utils/validations/person.validation';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TableManagementRole(props) {
  const { rows, totalItems, currentTermId, totalPage, page, handleChangePage } = props;
  const navigate = useNavigate();

  //   const [openEditInfoModal, setOpenEditInfoModal] = useState({ lecturerId: '', isOpen: false });

  //   const handleCloseEditInfoModal = () => {
  //     setOpenEditInfoModal({ ...openEditInfoModal, isOpen: false });
  //   };
  //   const handleOpenInfoModal = (lecturerId: string) => {
  //     setOpenEditInfoModal({ lecturerId, isOpen: true });
  //   };

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin giảng viên',
      field: 'none',
      flex: 1.5,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box gap={4} display={'flex'} alignItems={'center'}>
            <Box>
              <Typography fontWeight={600} variant='body1'>
                {params.row.fullName}
              </Typography>
              <Typography>
                Mã GV: {'  '}
                <Typography component={'span'}>{params.row.username}</Typography>
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      headerName: 'Giới tính',
      field: 'gender',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{checkGender(params.row.gender)}</Typography>;
      },
    },

    {
      headerName: 'Chuyên ngành',
      field: 'none2',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => <Typography variant='body1'>{params.row.majorName}</Typography>,
    },
    {
      headerName: 'Quyền người dùng',
      field: 'role',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{checkRoleLecturer(params.row.role)}</Typography>;
      },
    },
    {
      headerName: '',
      field: 'updateTing',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Cập nhật quyền'>
            <IconButton size='small'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Box></Box>
          <Tooltip title='Xem Chi tiết quyền'>
            <IconButton
              color='primary'
              size='small'
              onClick={() => navigate(`/lecturers/detail/${params.row.id}`)}
            >
              <Icon width={20} icon='fluent:apps-list-detail-20-filled' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Table
          rows={rows}
          sx={{
            bgcolor: 'white',
            width: '100%',
          }}
          columns={basicColumns}
          totalItems={totalItems}
          totalPages={totalPage}
          page={page}
          handleChangePage={handleChangePage}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          minHeight={400}
        />
      </Box>
    </>
  );
}

export default TableManagementRole;
