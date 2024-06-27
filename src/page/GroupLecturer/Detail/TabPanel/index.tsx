import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { TabPanel } from '@mui/lab';
import TableManagementGroupLecturer from '@/page/DetailGroupLecturer/Management/Table';

function TabPanelUI(props: any) {
  const { groupLecturer } = props;
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'h4' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Thông tin chung' value='1' />
            <Tab label='Danh sách giảng viên' value='2' />
          </TabList>
        </Box>

        <TabPanel value={'1'}>hello world</TabPanel>
        <TabPanel value={'2'}>
          <TableManagementGroupLecturer rows={groupLecturer.members} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabPanelUI;
