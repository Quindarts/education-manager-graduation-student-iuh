import Table from '@/components/ui/Table/Table';
import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import CommentEventModal from '../../CommentModal';

function TableEdit(props) {
  const { rows, totalItems, totalPage, eventId } = props;
  const [openComment, setOpenComment] = useState({
    id: '',
    groupId: '',
    name: '',
    isOpen: false,
    oldComment: '',
  });
  const handleOpenComment = (id: string, groupId: string, name: string, oldComment: string) => {
    setOpenComment({
      id,
      groupId,
      name,
      isOpen: true,
      oldComment,
    });
  };
  const handleCloseComment = () => {
    setOpenComment((prev) => ({ ...prev, isOpen: false }));
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
        headerName: 'Tên đề tài',
        field: 'topicName',
        flex: 2,
        align: 'left',
        headerAlign: 'left',
      },
      {
        headerName: 'Minh chứng',
        field: 'link',
        flex: 1.2,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
          <Typography variant='body1' color='initial'>
            {params.row.link ? params.row.link : 'Chưa cập nhật'}
          </Typography>
        ),
      },
      {
        headerName: 'Nhận xét',
        field: 'comment',
        flex: 1,
        headerAlign: 'left',
        renderCell: (params) => (
          <>
            {params.row.comment ? (
              <Box width={'100%'}>
                <Typography variant='body1' color='initial'>
                  {params.row.comment}
                </Typography>
                <Button
                  sx={{ float: 'right' }}
                  color='warning'
                  onClick={() =>
                    handleOpenComment(eventId, params.row.id, params.row.name, params.row.comment)
                  }
                >
                  Sửa nhận xét
                </Button>
              </Box>
            ) : (
              <Button
                onClick={() =>
                  handleOpenComment(eventId, params.row.id, params.row.name, params.row.comment)
                }
              >
                Chưa có nhận xét, thêm nhận xét
              </Button>
            )}
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
          minHeight: 450,
        }}
        limit={300}
        rowHeight={75}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
        disableColumnFilter
      />
      <CommentEventModal
        onClose={handleCloseComment}
        name={openComment.name}
        groupId={openComment.groupId}
        id={openComment.id}
        open={openComment.isOpen}
        oldComment={openComment.oldComment}
      />
    </>
  );
}

export default TableEdit;
