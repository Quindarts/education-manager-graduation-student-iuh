import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DetailCalendar from './DetailCalendar';
import DetailSupportStudent from './DetailSupportStudent';
import GroupLecturer from './GroupLecturer';
function TabPanelUI() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'h4' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange} aria-label=''>
            <Tab label='Nhóm hướng dẫn' value='1' />
            <Tab label='Lịch làm việc' value='2' />
            <Tab label='Nhóm giảng viên của tôi' value='3' />
          </TabList>
        </Box>
        <DetailSupportStudent value='1' />
        <DetailCalendar value='2' />
        <TabPanel value='3'>
          <GroupLecturer />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabPanelUI;
