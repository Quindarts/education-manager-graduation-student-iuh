import { LinearProgress, Skeleton } from '@mui/material';
import React from 'react';

function SekeletonUI() {
  return (
    <>
      <LinearProgress />
      <Skeleton sx={{ bgColor: 'primary.main' }} width={'full'} height={100} />
      <Skeleton width={'full'} height={100} />
      <Skeleton width={'full'} height={100} />
      <Skeleton width={'full'} height={200} />
    </>
  );
}

export default SekeletonUI;
