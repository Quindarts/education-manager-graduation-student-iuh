import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import DetailCalendar from './DetailCalendar';
import DetailSupportStudent from './DetailSupportStudent';
import GroupLecturer from './GroupLecturer';
import { TabPanel } from '@mui/lab';
import { useTopic } from '@/hooks/api/useQueryTopic';
import TableManagamentTopic from '@/page/Topic/Table';
import TableTopic from './TableTopic';
function TabPanelUI({ lecturerId }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { handleTopicsByLecturerByTerm } = useTopic();
  const { data, isLoading, isFetching } = handleTopicsByLecturerByTerm(lecturerId);

  return (
    <Box sx={{ width: '100%', typography: 'h4' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange} aria-label=''>
            <Tab label='Nhóm hướng dẫn' value='1' />
            <Tab label='Danh sách đề tài' value='2' />
            <Tab label='Nhóm giảng viên đã tham gia' value='3' />
            <Tab label='Lịch làm việc' value='4' />
          </TabList>
        </Box>
        <DetailSupportStudent lecturerId={lecturerId} value='1' />
        <DetailCalendar value='4' />
        <TabPanel value='3'>
          <GroupLecturer lecturerId={lecturerId} />
        </TabPanel>
        <TabPanel value='2'>
          <TableTopic rows={data?.topics ? data.topics : []} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabPanelUI;
