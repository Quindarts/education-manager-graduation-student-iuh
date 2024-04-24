import Table from '@/components/ui/Table/Table';
import { Box } from '@mui/material';
import React from 'react';

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <Box height='120vh'>
      <h1>Dashboard</h1>

      <Table
        rows={[]}
        columns={[]}
        totalItems={1}
        totalPages={1}
        page={1}
        handelChangePage={() => {}}
      />
    </Box>
  );
}
