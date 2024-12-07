import { Box } from '@mui/material';
import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TitleManager from '@/components/ui/Title';
import CreateStudentNotifyForm from '../NotifyStudent';
import CreateLecturerNotifyForm from '../NotifyLecturer';
import CreateGroupStudentNotifyForm from '../NotifyGroupStudent';
// import CreateGroupLecturerNotifyForm from '../NotifyGroupLecturer';
function TabPanelCreateNotify() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgb(0, 82, 177,0.1)',
                  ' > .MuiTypography-root': {
                    color: 'primary.dark',
                    fontWeight: 'bold',
                  },
                },
              }}
              label={
                <TitleManager color={'grey.700'} variant='body1'>
                  Gửi thông báo đến giảng viên
                </TitleManager>
              }
              value='1'
            />
            <Tab
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgb(0, 82, 177,0.1)',
                  ' > .MuiTypography-root': {
                    color: 'primary.dark',
                    fontWeight: 'bold',
                  },
                },
              }}
              label={
                <TitleManager color={'grey.700'} variant='body1'>
                  Gửi thông báo đến sinh viên
                </TitleManager>
              }
              value='2'
            />
            <Tab
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgb(0, 82, 177,0.1)',
                  ' > .MuiTypography-root': {
                    color: 'primary.dark',
                    fontWeight: 'bold',
                  },
                },
              }}
              label={
                <TitleManager color={'grey.700'} variant='body1'>
                  Gửi thông báo đến nhóm sinh viên
                </TitleManager>
              }
              value='3'
            />
            {/* <Tab
              sx={{
                '&.MuiButtonBase-root .MuiTab-root': {},
                '&.Mui-selected': {
                  bgcolor: 'rgb(0, 82, 177,0.1)',
                  ' > .MuiTypography-root': {
                    color: 'primary.dark',
                    fontWeight: 'bold',
                  },
                },
              }}
              label={
                <TitleManager color={'grey.700'} variant='body1'>
                  Gửi thông báo đến nhóm giảng viên
                </TitleManager>
              }
              value='4'
            /> */}
          </TabList>
        </Box>
        <TabPanel value='1'>
          <CreateLecturerNotifyForm />
        </TabPanel>
        <TabPanel value='2'>
          <CreateStudentNotifyForm />
        </TabPanel>
        <TabPanel value='3'>
          <CreateGroupStudentNotifyForm />
        </TabPanel>
        {/* <TabPanel value='4'>
          <CreateGroupLecturerNotifyForm />
        </TabPanel> */}
      </TabContext>
    </div>
  );
}

export default TabPanelCreateNotify;
