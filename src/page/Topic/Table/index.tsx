import Table from '@/components/ui/Table/Table';
import { dummyTopics } from '@/dummy/topic';
import { Icon } from '@iconify/react';
import { Box, Button, ButtonPropsColorOverrides, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
interface EnumStatusTopicType {
  value: string;
  color: string;
}
const ENUM_STATUS_TOPIC_TYPE_MAP: EnumStatusTopicType[] = [
  {
    value: 'ACCEPT',
    color: 'success',
  },
  {
    value: 'PENDING',
    color: 'warning',
  },
  {
    value: 'REFUSE',
    color: 'primary',
  },
];
// const handleStatus:OverridableStringUnion<"success" | "warning" | "primary" | "inherit" | "secondary" | "error" | "info", ButtonPropsColorOverrides> | undefined' = (value: string) => {
//   ENUM_STATUS_TOPIC_TYPE_MAP.forEach((item: EnumStatusTopicType) => {
//     if (item.value === value) return item.color;
//     else return '';
//   });
// };
function TableManagamentTopic(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Đề tài',
      field: 'name',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Số lượng',
      field: 'quantityGroupMax',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mô tả',
      field: 'description',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mục tiêu',
      field: 'target',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Yêu cầu đầu vào',
      field: 'requireInput',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Chuẩn đầu ra',
      field: 'standradOutput',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        return (
          <>
            {param.row.status !== 'PENDING' ? (
              <Button
                variant='contained'
                color={param.row.status === 'ACCEPT' ? 'success' : 'warning'}
                sx={{ p: 0, fontSize: 12 }}
              >
                {param.row.status}
              </Button>
            ) : (
              <Box display={'flex'} gap={2}>
                <Button
                  color='primary'
                  variant='contained'
                  sx={{ p: 1, fontSize: 12, textTransform: 'uppercase' }}
                >
                  Duyệt ngay
                </Button>
                <Button
                  color='error'
                  variant='contained'
                  sx={{ p: 1, fontSize: 12, textTransform: 'uppercase' }}
                >
                  Từ chối
                </Button>
              </Box>
            )}
          </>
        );
      },
    },
    {
      headerName: '',
      field: 'none',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Chỉnh sửa thông tin đề tài'>
            <IconButton size='small' color='primary'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem thông tin đề tài'>
            <IconButton size='small'>
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa đề tài'>
            <IconButton size='small'>
              <Icon color='#cc563d' icon='ri:delete-bin-2-fill' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <Box {...rest}>
      {' '}
      <Table
        rows={dummyTopics}
        sx={{
          bgcolor: 'white',
        }}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        checkboxSelection={true}
        handelChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}

export default TableManagamentTopic;
