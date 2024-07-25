import { TabPanel, TabPanelProps } from '@mui/lab';
import { Box } from '@mui/material';
import React from 'react';

function DetailCalendar(props: TabPanelProps) {
  const { value } = props;
  return (
    <TabPanel value={value}>
      <Box display={'flex'} gap={10}>
        <Box flex={1}></Box>
        <Box flex={1}>
        </Box>
      </Box>
    </TabPanel>
  );
}

export default DetailCalendar;
