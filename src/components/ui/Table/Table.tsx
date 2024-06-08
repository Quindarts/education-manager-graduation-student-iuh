import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import React from 'react';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
interface Props extends DataGridProps {
  minHeight?: number;
  page: number;
  totalPages: number;
  totalItems: number;
  handelChangePage: (page: number) => void;
  needReset?: boolean;
  onReset?: () => void;
  noData?: React.ReactNode;
}

export default function Table(props: Props) {
  const {
    minHeight = 500,
    sx,
    page,
    totalPages,
    totalItems,
    needReset,
    handelChangePage,
    onReset,
    noData,
    ...rest
  } = props;
  return (
    <Box
      style={{ minWidth: 0 }}
      sx={{
        width: '100%',
        minHeight,
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        hideFooter
        slots={{
          noRowsOverlay: () => (
            <Box
              mx={'auto'}
              display={'flex'}
              flexDirection={'column'}
              alignContent={'center'}
              justifyContent={'center'}
              textAlign={'center'}
              my={20}
              width={'100%'}
            >
              <Box>
                <img
                  style={{ opacity: 0.7 }}
                  width={200}
                  height={200}
                  src='/images/nodata.png'
                  alt='nodata'
                />
              </Box>
              <Typography variant='h3' sx={{ mt: 2 }}>
                Không có dữ liệu ( Data not found)
              </Typography>
              <Box>{noData}</Box>
            </Box>
          ),
          loadingOverlay: () => <LinearProgress />,
        }}
        sx={{
          fontSize: 12,
          cursor: 'pointer',
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            minHeight,
            width: '100%',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderColor: 'text.disabled',
            bgcolor: 'primary.dark',
            color: 'white',
          },

          '& .MuiDataGrid-virtualScroller': {
            minHeight,
            overflowX: 'auto',
            '::-webkit-scrollbar': {
              height: 2,
            },
            '::-webkit-scrollbar-track': {
              background: 'transparent',
            },

            /* Handle */
            '::-webkit-scrollbar-thumb': {
              background: 'secondary.main',
            },

            /* Handle on hover */
            ' ::-webkit-scrollbar-thumb:hover': {
              background: 'secondary.main',
            },
          },
          ...sx,
        }}
        {...rest}
      />
      <Box display='flex' alignItems='center' justifyContent='space-between' mr={2} mt={4}>
        <Box display='flex' alignItems='center'>
          <Typography variant='body1' sx={{ mx: 2 }} display='flex'>
            Tổng số trang:{'  '}
            <Typography variant='body1' fontWeight={600}>
              {totalItems}
            </Typography>
          </Typography>
          {needReset && (
            <IconButton
              aria-label='reset'
              title='Làm mới'
              onClick={onReset}
              size='small'
              color='info'
            ></IconButton>
          )}
        </Box>
        <Pagination
          count={totalPages}
          variant='outlined'
          color='primary'
          shape='rounded'
          onChange={(_, page) => handelChangePage(page)}
          page={page}
        />
      </Box>
    </Box>
  );
}
