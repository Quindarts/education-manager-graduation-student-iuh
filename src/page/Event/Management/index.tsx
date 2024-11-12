import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import TitleManager from '@/components/ui/Title';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import useParams from '@/hooks/ui/useParams';

import TableEventManagement from './Table';
import HeaderEvent from './Header';
import useEvent from '@/hooks/api/useQueryEvent';
import { convertEventTable } from '@/utils/convertDataTable';

export function removeVietnameseTones(str: string) {
  return str
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
export const handleSearch = (fetchEvent: any[], typeSearch: string, keywords: string) => {
  const fetchEventSort = fetchEvent?.slice()?.sort((a, b) => a.name.localeCompare(b.name));
  if (keywords.length === 0 || typeSearch.length === 0) {
    return fetchEventSort;
  }
  let query = removeVietnameseTones(keywords?.toLowerCase());
  const filteredfetchEvent = fetchEvent?.filter((gr: any) => {
    let val = removeVietnameseTones(gr[`${typeSearch}`]?.toLowerCase());
    return val?.includes(query);
  });
  return filteredfetchEvent?.sort((a, b) => a.name.localeCompare(b.name));
};

function EventManagement() {
  //[PARAMS]
  const { getQueryField } = useParams();
  const { handleGetEvents } = useEvent();
  const { data: fetchEvent, isLoading } = handleGetEvents();
  console.log(
    '🚀 ~ EventManagement ~ convertEventTable(fetchEvent.events):',
    convertEventTable(fetchEvent?.events),
  );

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      <Box justifyContent={'space-between'} display={'flex'} mb={2} mt={2}>
        <TitleManager icon='quill:list' mb={8} mt={2}>
          Danh sách sự kiện
        </TitleManager>
        <Box>
          <Typography variant='body1' fontWeight={600} color='#464646'>
            Tổng số lượng : {fetchEvent?.events?.length} sự kiện
          </Typography>
          {getQueryField('keywords') && (
            <Typography
              textAlign={'end'}
              variant='body1'
              fontWeight={500}
              mt={0}
              mb={1}
              color='primary'
            >
              Kết quả tìm kiếm:{' '}
              {fetchEvent
                ? handleSearch(
                    convertEventTable(fetchEvent.events),
                    getQueryField('searchField'),
                    getQueryField('keywords'),
                  ).length
                : 0}{' '}
              sự kiện
            </Typography>
          )}
        </Box>
      </Box>

      <HeaderEvent countGroups={100} />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <TableEventManagement
          totalPage={1}
          totalItems={
            fetchEvent
              ? handleSearch(
                  convertEventTable(fetchEvent.events),
                  getQueryField('searchField'),
                  getQueryField('keywords'),
                ).length
              : 0
          }
          rows={
            fetchEvent
              ? handleSearch(
                  convertEventTable(fetchEvent.events),
                  getQueryField('searchField'),
                  getQueryField('keywords'),
                )
              : []
          }
        />
      )}
    </Paper>
  );
}

export default EventManagement;
