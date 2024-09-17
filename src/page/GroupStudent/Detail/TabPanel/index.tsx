import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { TabPanel } from '@mui/lab';
import BasicInformationGrStudentPage from '@/page/DetailGroupStudent/BasicInformation';
import StudentInGroupPage from '@/page/DetailGroupStudent/StudentInGroup';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import GroupByAssign from '@/page/DetailGroupStudent/GroupByAssign';

function TabPanelUI(props: any) {
  const { groupStudent } = props;
  const [value, setValue] = React.useState('1');
  const { handleUiRender } = useGroupStudent();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'h4' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange} aria-label=''>
            <Tab label='Thông tin chung' value='1' />
            <Tab label='Danh sách sinh viên' value='2' />
            <Tab label='Danh sách nhóm giảng viên chấm điểm' value='3' />
          </TabList>
        </Box>
        <TabPanel value={'1'}>
          <BasicInformationGrStudentPage groupStudent={groupStudent.info} />
        </TabPanel>
        <TabPanel value={'2'}>
          <StudentInGroupPage members={groupStudent.members} />
        </TabPanel>
        <TabPanel value={'3'}>
          <GroupByAssign groupLecturers={groupStudent.groupLecturers} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabPanelUI;
