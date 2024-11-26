import Table from '@/components/ui/Table/Table';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteGroupStudentModal from '../Modal/DeleteModal';
import { isPassStatus } from '@/utils/validations/groupStudent.validation';

function TableManagamentGroupStudent(props: any) {
  const { rows, totalItems, totalPage } = props;
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
        field: 'name6',
        flex: 3,
        headerAlign: 'left',
        renderCell: (params: any) => {
          return (
            <Typography>
              {params.row.topicName ? params.row.topicName : 'Chưa có đề tài'}
            </Typography>
          );
        },
      },
      {
        headerName: 'GV hướng dẫn',
        field: 'name3',
        flex: 1.2,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: any) => {
          return (
            <Typography>
              {params.row.lecturerName ? params.row.lecturerName : 'Chưa có giảng viên HD'}
            </Typography>
          );
        },
      },

      {
        headerName: 'Thành viên',
        field: 'field',
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
            <Tooltip title='Chi tiết'>
              <IconButton
                color='primary'
                onClick={() => navigate(`/group-students/detail/${params.row.id}`)}
              >
                <Icon icon='clarity:file-group-line' style={{ color: '#0288d1' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Xóa nhóm'>
              <IconButton
                color='primary'
                onClick={() => handleOpenModalDelete(params.row.id, params.row.name)}
              >
                <Icon icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [],
  );
  const { onImportGroupStudent } = useGroupStudent();
  const { mutate: importGr } = onImportGroupStudent();

  return (
    <Box>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
          width: '100%',
          minHeight: 450,
        }}
        limit={300}
        rowHeight={75}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
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
