import PromotionTextContent from '@/components/ui/PromotionTextContent';
import { TabPanel, TabPanelProps } from '@mui/lab';
import { Box } from '@mui/material';
import React from 'react';

function DetailCalendar(props: TabPanelProps) {
  const { value } = props;
  return (
    <TabPanel value={value}>
      <Box display={'flex'} p={10} alignItems={'center'} justifyContent={'center'} gap={10}>
        <PromotionTextContent />
      </Box>
    </TabPanel>
  );
}

export default DetailCalendar;
