import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateInstructorGroupPage from './Reviewer';
import CreateReportGroupPage from './Report';
import TitleManager from '@/components/ui/Title';

function CreateGroupLecturer() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ py: 6, px: 10 }} elevation={1}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab
                sx={{
                  '&.Mui-selected > .MuiTypography-root': {
                    color: 'error.main',
                  },
                }}
                label={
                  <TitleManager color={'grey.700'} variant='body1' icon='akar-icons:zoom-fill'>
                    Phân công chấm Phản biện
                  </TitleManager>
                }
                value='1'
              />
              <Tab
                sx={{
                  '&.Mui-selected > .MuiTypography-root': {
                    color: 'error.main',
                  },
                }}
                label={
                  <TitleManager color={'grey.700'} variant='body1' icon='fontisto:room'>
                    Phân công chấm Báo cáo
                  </TitleManager>
                }
                value='2'
              />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <CreateInstructorGroupPage />
          </TabPanel>
          <TabPanel value='2'>
            <CreateReportGroupPage />
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
}

export default CreateGroupLecturer;
