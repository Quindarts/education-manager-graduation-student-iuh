import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { TabPanel } from '@mui/lab';
import TableManagementGroupLecturer from '@/page/DetailGroupLecturer/Management/Table';
import { Paper, Typography } from '@mui/material';
import CustomTextField from '@/components/ui/CustomTextField';
import { Icon } from '@iconify/react';
import { useTopic } from '@/hooks/api/useQueryTopic';
import TableManagementGroupAssign from '@/page/DetailGroupLecturer/GroupAssign/Table';

function TabPanelUI(props: any) {
  const { groupLecturer } = props;
  const [value, setValue] = React.useState('1');
  const type = groupLecturer.type;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'h4' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange}>
            <Tab label='Danh sách giảng viên' value='1' />
            <Tab label='Nhóm sinh viên được phân công' value='2' />
          </TabList>
        </Box>

        <TabPanel value={'2'}>
          <TableManagementGroupAssign groupType={type} rows={groupLecturer?.groupStudents} />
        </TabPanel>
        <TabPanel value={'1'}>
          <TableManagementGroupLecturer groupType={type} rows={groupLecturer?.members} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabPanelUI;
