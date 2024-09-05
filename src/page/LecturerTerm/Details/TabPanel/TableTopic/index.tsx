import Table from '@/components/ui/Table/Table';
import { getCardTopicStatus } from '@/utils/validations/topic.validation';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

function TableTopic(props) {
  const { rows, limit, page, ...rest } = props;
  const LecturerColumn: GridColDef[] = [
    {
      headerName: 'Mã đề tài',
      field: 'key',
      headerAlign: 'center',
      align: 'center',
      flex: 0.2,
    },
    {
      headerName: 'Tên Đề tài',
      field: 'name',
      flex: 2,
      headerAlign: 'center',
    },
    {
      headerName: 'SL nhóm đề tài',
      field: 'quantityGroupMax',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        return (
          <Box>
            {param.row.quantityGroup} / {param.row.quantityGroupMax}{' '}
          </Box>
        );
      },
    },

    {
      headerName: 'Trạng thái',
      field: 'text2',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        return <Box>{getCardTopicStatus(param.row.status)}</Box>;
      },
    },
  ];
  return (
    <Table
      rows={rows.map((row: any, index: number) => ({ ...row }))}
      sx={{
        minHeight: 500,
      }}
      columns={LecturerColumn}
      rowHeight={60}
      totalItems={rows.length}
      totalPages={1}
      page={1}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
    />
  );
}

export default TableTopic;
