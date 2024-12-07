import Table from '@/components/ui/Table/Table';
import { getStatusGroup, getStatusStudentStyle } from '@/utils/validations/groupStudent.validation';
import { Box, Link, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function TableManagamentGroupStudent(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const navigate = useNavigate();

  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Mã nhóm',
        field: 'name',
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
      },
      {
        headerName: 'Tên Đề tài',
        field: 'name6',
        flex: 3,
        renderCell: (params: any) => {
          return (
            <Typography>
              {params.row.topicName ? params.row.topicName : 'Chưa có đề tài'}
            </Typography>
          );
        },
      },
      {
        headerName: 'Link tài liệu',
        field: 'link',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: any) => {
          return (
            <>
              {params.value ? (
                <Link
                  href={`${params.value}`}
                  sx={{ fontStyle: 'italic', fontWeight: 500, cursor: 'pointer' }}
                  mx={2}
                  target='_blank'
                >
                  Xem tài liệu{' '}
                </Link>
              ) : (
                <Typography mx={2} component={'span'} variant='body1' color='initial'>
                  Chưa nộp
                </Typography>
              )}
            </>
          );
        },
      },
      {
        headerName: 'Thành viên',
        field: 'name4',
        flex: 2,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: any) => {
          return (
            <Box>
              {params.row.members?.map((member: any) => (
                <Box mb={2} display={'flex'}>
                  <Typography
                    width={{
                      md: 120,
                      lg: 130,
                      xl: 150,
                    }}
                  >
                    {member?.fullName}
                  </Typography>
                  <Typography
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      textAlign: 'center',
                    }}
                    color={getStatusStudentStyle(member.status)}
                    bgcolor={getStatusStudentStyle(member.status)}
                    variant='body1'
                  >
                    {getStatusGroup(member.status)}
                  </Typography>
                </Box>
              ))}
            </Box>
          );
        },
      },
      {
        headerName: 'Chức năng',
        field: 'name2',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: any) => {
          return (
            <Typography
              sx={{
                '&:hover': {
                  color: 'primary.dark',
                  cursor: 'pointer',
                },
              }}
              onClick={() =>
                navigate(`/group-supports/detail/${params.row.id}?name=${params.row.name}`)
              }
            >
              Xem chi tiết
            </Typography>
          );
        },
      },
    ],
    [],
  );
  return (
    <Box>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        rowHeight={90}
        columns={basicColumns}
        totalItems={totalItems}
        isPanigation={false}
      />
    </Box>
  );
}

export default TableManagamentGroupStudent;
