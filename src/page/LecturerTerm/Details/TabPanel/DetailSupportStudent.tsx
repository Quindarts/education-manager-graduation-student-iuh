import { TabPanel, TabPanelProps } from '@mui/lab';
import React from 'react';
import TableSupportStudent from './TableSupportStudent.tsx';

function DetailSupportStudent(props: TabPanelProps) {
  const { value } = props;
  return (
    <TabPanel value={value} sx={{ my: 10 }}>
      <TableSupportStudent />
    </TabPanel>
  );
}

export default DetailSupportStudent;
