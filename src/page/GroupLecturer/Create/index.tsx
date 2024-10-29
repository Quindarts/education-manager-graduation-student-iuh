import { Box, Paper } from '@mui/material';
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
    <Paper sx={{ px: 4 }} elevation={0}>
      <Box sx={{ width: '100%', typography: 'body1', mt: 4 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgb(0, 82, 177,0.1)',
                    ' > .MuiTypography-root': {
                      color: 'primary.dark',
                      fontWeight: '600',
                    },
                  },
                }}
                label={
                  <TitleManager color={'grey.700'} variant='body1'>
                    Phân công chấm Phản biện
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
                      fontWeight: '600',
                    },
                  },
                }}
                label={
                  <TitleManager color={'grey.700'} variant='body1'>
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
