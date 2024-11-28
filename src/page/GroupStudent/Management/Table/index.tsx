import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteGroupStudentModal from '../Modal/DeleteModal';
import { isPassStatus } from '@/utils/validations/groupStudent.validation';

function TableManagamentGroupStudent(props: any) {
  const { rows, totalItems } = props;
  const navigate = useNavigate();
  const [openModalDelete, setOpenModalDelete] = useState({
    isOpen: false,
    groupStudentId: '',
    groupStudentName: '',
  });

  const handleOpenModalDelete = (groupStudentId: string, groupStudentName: string) => {
    setOpenModalDelete({
      groupStudentId: groupStudentId,
      groupStudentName: groupStudentName,
      isOpen: true,
    });
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete((pre: any) => ({ ...pre, isOpen: false }));
  };
  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Mã nhóm',
        field: 'name',
        flex: 0.6,
        align: 'center',
        headerAlign: 'center',
      },
      {
        headerName: 'Tên Đề tài',
        field: 'topicName',
        flex: 3,
        headerAlign: 'left',
        renderCell: (params: any) => {
          return <Typography>{params.value ? params.value : 'Chưa có đề tài'}</Typography>;
        },
      },
      {
        headerName: 'GV hướng dẫn',
        field: 'lecturerName',
        flex: 1.2,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: any) => {
          return <Typography>{params.value ? params.value : 'Chưa có giảng viên HD'}</Typography>;
        },
      },

      {
        headerName: 'Thành viên',
        field: 'members',
        flex: 1.6,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: any) => {
          return (
            <Box>
              {params.row.members[0] !== null ? (
                <>
                  {params.row.members.map((std, index: number) => (
                    <Typography key={index} variant='body1' mb={2} color='initial'>
                      {std.username} - {std.fullName}
                      {isPassStatus(std.status) === false && (
                        <Typography component={'span'} variant='body1' color='error.main'>
                          {'- (RỚT) -'}
                        </Typography>
                      )}{' '}
                    </Typography>
                  ))}
                </>
              ) : (
                <Typography>Chưa có thành viên</Typography>
              )}
            </Box>
          );
        },
      },
      {
        headerName: 'Chức năng',
        field: 'name8',
        flex: 0.7,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: any) => (
          <Box display={'flex'} gap={6}>
            <Tooltip
              onClick={() => navigate(`/group-students/detail/${params.row.id}`)}
              title='Chi tiết'
            >
              <IconButton color='primary'>
                <Icon icon='clarity:file-group-line' style={{ color: '#0288d1' }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              onClick={() => handleOpenModalDelete(params.row.id, params.row.name)}
              title='Xóa nhóm'
            >
              <IconButton color='primary'>
                <Icon icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [],
  );
  return (
    <Box>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
          width: '100%',
          minHeight: 450,
        }}
        limit={150}
        rowHeight={75}
        columns={basicColumns}
        totalItems={totalItems}
        isPanigation={false}
        disableColumnFilter
      />
      <DeleteGroupStudentModal
        groupStudentId={openModalDelete.groupStudentId}
        groupStudentName={openModalDelete.groupStudentName}
        open={openModalDelete.isOpen}
        onClose={handleCloseModalDelete}
      />
    </Box>
  );
}

export default TableManagamentGroupStudent;
