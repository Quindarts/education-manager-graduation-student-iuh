import { Box, Paper } from '@mui/material';
import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateInstructorGroupPage from './Instructor';
import CreateReportGroupPage from './Report';

function CreateGroupLecturer() {
  
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Phân công chấm phản biện' value='1' />
              <Tab label='Phân công chấm hội đồng' value='2' />
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
