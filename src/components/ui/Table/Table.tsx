import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import React from 'react';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
interface Props extends DataGridProps {
  minHeight?: number;
  page: number;
  totalPages: number;
  totalItems: number;
  handelChangePage: (page: number) => void;
  needReset?: boolean;
  onReset?: () => void;
}

export default function Table(props: Props) {
  const {
    minHeight = 400,
    sx,
    page,
    totalPages,
    totalItems,
    needReset,
    handelChangePage,
    onReset,
    ...rest
  } = props;
  return (
    <Box
      sx={{
        minHeight,
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        hideFooter
        slots={{
          noRowsOverlay: () => (
            <Box mx={'auto'} display={'flex'} flexDirection={'column'}  alignContent={'center'} justifyContent={'center'} textAlign={'center'} my={20} width={'full'}>
             <Box>
             <Icon width={100} icon="flat-color-icons:file" /><Icon   width={100}  icon="flat-color-icons:data-backup" />
             </Box>
                <Typography variant='h6' sx={{ mt: 2 }}>
                    Không có dữ liệu ( Data not found)
                  </Typography>
            </Box>
         
          ),
          loadingOverlay: () => <LinearProgress />,
        }}
        sx={{
          fontSize: 16,
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            // outline: 'none !important',
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            minHeight,
            width: '100%',
          },
          borderColor: 'divider',
          '& .MuiDataGrid-columnHeaders': {
            borderColor: 'divider',
          },
          '& .MuiDataGrid-virtualScroller': {
            minHeight,
            overflowX: 'auto',
            '::-webkit-scrollbar': {
              height: 6,
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
            Tổng số:
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
            >
              {/* <RestartAltIcon /> */}
            </IconButton>
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
