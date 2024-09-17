import Table from '@/components/ui/Table/Table';
import { Box, Button,  Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Assign from '../../Assign';

function TableManagamentGroupLecturer(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, groupType, ...rest } = props;
  const navigate = useNavigate();

  const [assignModal, setAssignModal] = useState({
    groupId: '',
    groupName: '',
    totalAssigns: 0,
    isOpen: false,
  });
  const handleOpenAssignModal = (groupId: string, groupName: string, totalAssigns: number) => {
    setAssignModal({ groupId, groupName, totalAssigns, isOpen: true });
  };
  const handleCloseAssignModal = () => {
    setAssignModal((pre: any) => ({ ...pre, isOpen: false }));
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên nhóm',
      field: 'name',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Box>
            <Typography variant='body1' fontWeight={'bold'} color='primary.main'>
              {params.row.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: 'Thành viên ',
      field: 'name3',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Box>
            {params.row.members.map((mem: any, index: number) => (
              <Box component={'div'} my={2}>
                <Typography mr={4} component={'span'}>
                  {' '}
                  Mã GV: {mem.username}
                </Typography>
                {' - '}
                <Typography ml={4} component={'span'} width={100} color='initial'>
                  Họ và tên: {mem.fullName}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      },
    },
    {
      headerName: 'Số nhóm sinh viên phân công',
      field: 'totalAssigns',
      headerAlign: 'center',
      align: 'center',
      flex: 0.7,
    },
    {
      headerName: 'Chức năng',
      field: 'name8',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Button
            size='large'
            onClick={() => navigate(`/group-lecturers/details/${params.row.id}`)}
          >
            Xem chi tiết
          </Button>
          <Button
            size='large'
            sx={{
              color: 'orange',
            }}
            color='warning'
            onClick={() =>
              handleOpenAssignModal(params.row.id, params.row.name, params.row.totalAssigns)
            }
          >
            Xem/Phân công
          </Button>
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
          }}
          rowHeight={100}
          columns={basicColumns}
          totalItems={1}
          totalPages={1}
          page={1}
          handleChangePage={() => {}}
          disableColumnFilter
        />
      </Box>
      <Assign
        groupId={assignModal.groupId}
        groupName={assignModal.groupName}
        totalAssigns={assignModal.totalAssigns}
        onClose={handleCloseAssignModal}
        open={assignModal.isOpen}
        groupType={groupType}
      />
    </>
  );
}

export default TableManagamentGroupLecturer;
