import {
  LinearProgress,
  Skeleton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@mui/material';
import React from 'react';

function SekeletonTable() {
  return (
    <>
      <LinearProgress />
      <Box sx={{ width: '100%', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant='text' width='80%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='80%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='80%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='80%' />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant='rectangular' width='100%' height={40} />
                </TableCell>
                <TableCell>
                  <Skeleton variant='rectangular' width='100%' height={40} />
                </TableCell>
                <TableCell>
                  <Skeleton variant='rectangular' width='100%' height={40} />
                </TableCell>
                <TableCell>
                  <Skeleton variant='rectangular' width='100%' height={40} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default SekeletonTable;
