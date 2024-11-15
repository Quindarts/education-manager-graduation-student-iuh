import Table from '@/components/ui/Table/Table';
import { Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import EditModal from '../EditModal';

function TableEventManagement(props: any) {
  const { rows, totalItems, totalPage } = props;
  const [openEditEvent, setOpenEditEvent] = useState({ isOpen: false, id: '' });
  const handleOpenEditEvent = (id: string) => {
    setOpenEditEvent({ isOpen: true, id: id });
  };
  const handleCloseEditEventModal = () => {
    setOpenEditEvent((pre) => ({ ...pre, isOpen: false }));
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
        headerName: 'Deadline',
        field: 'endDate',
        flex: 0.6,
        type: 'string',
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => (
          <Typography>{dayjs(params.value).format(' hh:mm  DD-MM-YYYY ')}</Typography>
        ),
      },
      {
        headerName: 'Chức năng',
        field: 'field',
        flex: 0.6,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => (
          <Button onClick={() => handleOpenEditEvent(params.row.id)}>Xem chi tiết</Button>
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
          minHeight: 450,
        }}
        limit={300}
        rowHeight={75}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
        disableColumnFilter
      />
      <EditModal
        id={openEditEvent.id}
        onClose={handleCloseEditEventModal}
        open={openEditEvent.isOpen}
      />
    </>
  );
}

export default TableEventManagement;
