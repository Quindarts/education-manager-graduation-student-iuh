import TitleManager from '@/components/ui/Title';
import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagementNotification from './Table';
import { useNotification } from '@/hooks/api/useQueryNotification';
import SekeletonUI from '@/components/ui/Sekeleton';
import HeaderNotification from './Header';
import useParams from '@/hooks/ui/useParams';
import { useDispatch } from 'react-redux';
import { setParamTotalPage } from '@/store/slice/notification.slice';

function NotificationManagementPage() {
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleGetNotificationOfFilter, paramTotalPage } = useNotification();
  const { data, isFetching, isLoading, refetch } = handleGetNotificationOfFilter();
  const dispatch = useDispatch();

  //[]
  const { getQueryField, setPage, setLimit, setTotalPage } = useParams();

  const handleChangePage = (value: number) => {
    setCurrentPage(value);
  };
  const handleChangeLimit = (value: number) => {
    setCurrentLimit(value);
  };
  useEffect(() => {
    setLimit(currentLimit);
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLimit(currentLimit);
    refetch();
  }, [currentLimit]);
  useEffect(() => {
    if (data !== null) {
      const total = data ? data.params.totalPage : 0;
      dispatch(setParamTotalPage(total));
      setTotalPage(total);
    }
  }, [data]);
  useEffect(() => {
    setLimit(currentLimit);
    setPage(1);
    if (getQueryField('keywords') === '') {
      refetch();
    }
  }, [getQueryField('keywords')]);
  return (
    <>
      <Paper sx={{ py: 10, px: 10 }} elevation={1}>
        <TitleManager icon='basil:notification-on-outline' mb={6} mt={2}>
          Danh sách thông báo
        </TitleManager>
        <HeaderNotification />
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={4}>
            <TableManagementNotification
              limit={currentLimit}
              page={currentPage}
              totalPage={paramTotalPage}
              rows={data?.notifications ? data.notifications : []}
              handleChangePage={handleChangePage}
              handleChangeLimit={handleChangeLimit}
            />
          </Box>
        )}
      </Paper>
    </>
  );
}

export default NotificationManagementPage;
