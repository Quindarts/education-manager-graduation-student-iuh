import Table from '@/components/ui/Table/Table';
import { Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import EditModal from '../EditModal';
import DeleteModal from '../DeleteModal';

function TableEventManagement(props: any) {
  const { rows, totalItems, totalPage } = props;
  const [openEditEvent, setOpenEditEvent] = useState({ isOpen: false, id: '' });
  const handleOpenEditEvent = (id: string) => {
    setOpenEditEvent({ isOpen: true, id: id });
  };
  const handleCloseEditEventModal = () => {
    setOpenEditEvent((pre) => ({ ...pre, isOpen: false }));
  };

  const [openDeleteEvent, setOpenDeleteEvent] = useState({ isOpen: false, id: '', name: '' });
  const handleOpenDeleteEvent = (id: string, name: string) => {
    setOpenDeleteEvent({ isOpen: true, id: id, name: name });
  };
  const handleCloseDeleteEventModal = () => {
    setOpenDeleteEvent((pre) => ({ ...pre, isOpen: false }));
  };
  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Tên sự kiện',
        field: 'name',
        flex: 0.6,
        align: 'left',
        headerAlign: 'left',
      },
      {
        headerName: 'Ngày bắt đầu',
        field: 'startDate',
        flex: 0.6,
        type: 'string',
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => (
          <Typography>{dayjs(params.value).format(' hh:mm  A DD-MM-YYYY ')}</Typography>
        ),
      },
      {
        headerName: 'Ngày kết thúc',
        field: 'endDate',
        flex: 0.6,
        type: 'string',
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => (
          <Typography>{dayjs(params.value).format(' hh:mm A DD-MM-YYYY ')}</Typography>
        ),
      },
      {
        headerName: 'Chức năng',
        field: 'field',
        flex: 0.6,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <>
            <Button onClick={() => handleOpenEditEvent(params.row.id)}>Xem chi tiết</Button>
            <Button
              color='error'
              onClick={() => handleOpenDeleteEvent(params.row.id, params.row.name)}
            >
              Xóa sự kiện
            </Button>
          </>
        ),
      },
    ],
    [],
  );
  return (
    <>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
          width: '100%',
          minHeight: 400,
          height:400
        }}
        limit={300}
        isPanigation={false}
        rowHeight={75}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
        disableColumnFilter
        disableColumnMenu
        disableDensitySelector
        disableColumnSelector
      />
      <EditModal
        id={openEditEvent.id}
        onClose={handleCloseEditEventModal}
        open={openEditEvent.isOpen}
      />
      <DeleteModal
        id={openDeleteEvent.id}
        onClose={handleCloseDeleteEventModal}
        open={openDeleteEvent.isOpen}
        name={openDeleteEvent.name}
      />
    </>
  );
}

export default TableEventManagement;
