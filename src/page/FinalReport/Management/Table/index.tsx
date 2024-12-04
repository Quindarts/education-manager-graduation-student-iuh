import Table from '@/components/ui/Table/Table';
import { getCardArticleStatus } from '@/utils/validations/article.validation';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { env } from '@/utils/env';
import CommentEventModal from '../../CommentModal';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumRole } from '@/types/enum';

interface Props {
  rows: any[];
  page: number;
}

function TableFinalReportManagement(props: Props) {
  const { rows } = props;
  //handle
  const [openCommentModal, setOpenCommentModal] = useState({
    reportId: '',
    name: '',
    isOpen: false,
  });
  const { currentRoleRender } = useLecturer();
  const handleCloseCommentModal = () => {
    setOpenCommentModal({ ...openCommentModal, isOpen: false });
  };
  const handleOpenCommentModal = (reportId: string, name: string) => {
    setOpenCommentModal({ reportId, name, isOpen: true });
  };

  const HEAD_LEC_COLUMNS: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Mã nhóm',
        field: 'name',
        flex: 0.3,
        align: 'center',
        headerAlign: 'center',
      },
      {
        headerName: 'GVHD',
        field: 'lecturerName',
        flex: 0.5,
        align: 'left',
        headerAlign: 'left',
      },
      {
        headerName: 'Tên đề tài',
        field: 'topicName',
        flex: 1.6,
      },

      {
        headerName: 'Ngày nộp',
        field: 'publicDate',
        flex: 0.4,
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => <Typography>{dayjs(params.value).format('DD/MM/YYYY')}</Typography>,
      },
      {
        headerName: 'Tải file',
        field: 'link',
        flex: 0.4,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Typography
            component={'a'}
            href={`${env.API_URL}/${params.value}`}
            target='_blank'
            variant='body1'
            color='primary'
          >
            Xem chi tiết
          </Typography>
        ),
      },
      {
        headerName: 'Nhận xét',
        field: 'comment',
        flex: 0.8,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Box>
            {params.value == '' || !params.value ? (
              <Box>
                <Button
                  color='primary'
                  onClick={() => handleOpenCommentModal(params.row.id, params.row.name)}
                  startIcon={<Icon icon='fluent-emoji-high-contrast:writing-hand' />}
                >
                  Chưa có nhận xét
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant='body1' component={'i'} color='initial'>
                  {params?.value}
                </Typography>
                <Button
                  sx={{
                    float: 'right',
                  }}
                  color='warning'
                  startIcon={<Icon icon='fluent-emoji-high-contrast:writing-hand' />}
                  onClick={() => handleOpenCommentModal(params.row.id, params.row.name)}
                >
                  Cập nhật nhận xét
                </Button>
              </Box>
            )}
          </Box>
        ),
      },
    ],
    [],
  );

  const LECTURER_COLUMNS: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Mã nhóm',
        field: 'name',
        flex: 0.3,
        align: 'center',
        headerAlign: 'center',
      },
      {
        headerName: 'Tên đề tài',
        field: 'topicName',
        flex: 1.6,
      },

      {
        headerName: 'Ngày nộp',
        field: 'publicDate',
        flex: 0.4,
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => <Typography>{dayjs(params.value).format('DD/MM/YYYY')}</Typography>,
      },
      {
        headerName: 'Tải file',
        field: 'link',
        flex: 0.4,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Typography
            component={'a'}
            href={`${env.API_URL}/${params.value}`}
            target='_blank'
            variant='body1'
            color='primary'
          >
            Xem chi tiết
          </Typography>
        ),
      },
      {
        headerName: 'Nhận xét',
        field: 'comment',
        flex: 0.8,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Box>
            {params.value == '' || !params.value ? (
              <Box>
                <Button
                  color='primary'
                  onClick={() => handleOpenCommentModal(params.row.id, params.row.name)}
                  startIcon={<Icon icon='fluent-emoji-high-contrast:writing-hand' />}
                >
                  Chưa có nhận xét
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant='body1' component={'i'} color='initial'>
                  {params?.value}
                </Typography>
                <Button
                  sx={{
                    float: 'right',
                  }}
                  color='warning'
                  startIcon={<Icon icon='fluent-emoji-high-contrast:writing-hand' />}
                  onClick={() => handleOpenCommentModal(params.row.id, params.row.name)}
                >
                  Cập nhật nhận xét
                </Button>
              </Box>
            )}
          </Box>
        ),
      },
    ],
    [],
  );
  return (
    <>
      <Box>
        <Table
          rows={rows}
          sx={{
            bgcolor: 'white',
          }}
          rowHeight={120}
          columns={currentRoleRender === EnumRole.LECTURER ? LECTURER_COLUMNS : HEAD_LEC_COLUMNS}
          totalItems={rows ? rows.length : 0}
          disableColumnFilter
          minHeight={350}
          isPanigation={false}
        />
      </Box>
      <CommentEventModal
        open={openCommentModal.isOpen}
        reportId={openCommentModal.reportId}
        onClose={handleCloseCommentModal}
      />
    </>
  );
}

export default TableFinalReportManagement;
