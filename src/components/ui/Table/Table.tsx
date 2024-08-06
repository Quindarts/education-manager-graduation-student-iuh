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
  handleChangePage?: (page: number) => void;
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
    handleChangePage,
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
        componentsProps={{
          cell: {
            style: {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.5em',
              overflow: 'visible',
            },
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <Box
              mx={'auto'}
              display={'flex'}
              flexDirection={'column'}
              alignContent={'center'}
              justifyContent={'center'}
              textAlign={'center'}
              py={20}
              width={'100%'}
            >
              <Box>
                <img
                  style={{ opacity: 0.7 }}
                  width={200}
                  height={200}
                  src='/images/nodata.webp'
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
          fontSize: {
            xs: 12,
            md: 12,
            xl: 14,
          },
          color: 'grey.700',
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
          {/* <Box width={190}>
            <DropDown
              value={5}
              options={[
                { _id: '5', name: 'Hiển thị 5 dòng' },
                { _id: '10', name: 'Hiển thị 10 dòng' },
                { _id: '15', name: 'Hiển thị 15 dòng' },
                { _id: '20', name: 'Hiển thị 20 dòng' },
              ]}
            />
          </Box> */}
          <Typography variant='body1' sx={{ mx: 2 }} display='flex'>
            Tổng số dòng:{'  '}
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
          onChange={(_, page: number) => {
            handleChangePage(page);
          }}
          page={page}
        />
      </Box>
    </Box>
  );
}
