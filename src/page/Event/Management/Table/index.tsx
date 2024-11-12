import Table from '@/components/ui/Table/Table';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

function TableEventManagement(props: any) {
  const { rows, totalItems, totalPage } = props;
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
        field: 'deadline',
        flex: 0.6,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => (
          <Typography>{dayjs(params.value).format(' hh:mm  DD-MM-YYYY ')}</Typography>
        ),
      },
      {
        headerName: 'Tên nhóm',
        field: 'groupName',
        flex: 0.6,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Link',
        field: 'link',
        flex: 0.6,
        align: 'right',
        headerAlign: 'right',
      },
    ],
    [],
  );
  return (
    <div>
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
    </div>
  );
}

export default TableEventManagement;
