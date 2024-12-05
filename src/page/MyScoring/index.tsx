import React, { useState } from 'react';
import ScoreStudentPage from '../ScoreStudent';
import ScoreManagementExcel from '../ScoreManagementExcel';
import { Box, Paper, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function MyScoringPage() {
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={0}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange}>
            <Tab label='Chấm điểm (hiển thị danh sách điểm dạng cột)' value='1' />
            <Tab label='Chấm điểm (hiển thị danh sách điểm dạng lưới)' value='2' />
          </TabList>
        </Box>
        <TabPanel value={'2'}>
          <ScoreManagementExcel />
        </TabPanel>
        <TabPanel value={'1'}>
          <ScoreStudentPage />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}

export default MyScoringPage;
