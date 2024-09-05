import Table from '@/components/ui/Table/Table';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteGroupStudentModal from '../Modal/DeleteModal';

function TableManagamentGroupStudent(props: any) {
  const { rows, totalItems, limit, handleChangeLimit, totalPage, page, handleChangePage } = props;
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
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên nhóm',
      field: 'name',
      flex: 0.8,
      align: 'left',
      headerAlign: 'left',
    },
    {
      headerName: 'Thành viên',
      field: 'field',
      flex: 1.4,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: any) => {
        return (
          <Box>
            {params.row.studentNames[0] !== null ? (
              <>
                {params.row.studentNames.map((std, index) => (
                  <Typography variant='body1' color='initial'>
                    TV{index + 1}: {std}
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
      headerName: 'Tên Đề tài',
      field: 'name6',
      flex: 3,
      headerAlign: 'left',
      renderCell: (params: any) => {
        return (
          <Typography>{params.row.topicName ? params.row.topicName : 'Chưa có đề tài'}</Typography>
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
  ];
  const { onImportGroupStudent } = useGroupStudent();
  const { mutate: importGr } = onImportGroupStudent();
  const hanldeImport = () => {
    importGr();
  };

  return (
    <Box>
      <Table
        rows={rows}
        isLimit={true}
        sx={{
          bgcolor: 'white',
          width: '100%',
          minHeight: 500,
        }}
        rowHeight={75}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        page={page}
        limit={limit}
        disableColumnFilter
        minHeight={400}
        // noData={
        //   <Button variant='contained' onClick={hanldeImport}>
        //     Tạo danh sách nhóm sinh viên{' '}
        //   </Button>
        // }
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
