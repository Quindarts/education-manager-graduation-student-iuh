import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DetailCalendar from './DetailCalendar';
import DetailSupportStudent from './DetailSupportStudent';
function TabPanelUI() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'h4' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Lịch làm việc' value='1' />
            <Tab label='Nhóm hướng dẫn' value='2' />
          </TabList>
        </Box>
        <DetailCalendar value='1' />
        <DetailSupportStudent value='2' />
      </TabContext>
    </Box>
  );
}

export default TabPanelUI;
