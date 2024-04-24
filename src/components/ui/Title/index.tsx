import { Typography } from '@mui/material';
import React from 'react';

function TitleManager(props: any) {
  const { icon, children, ...rest } = props;
  return <Typography fontWeight={600} variant='h5' color='primary.main' {...rest}>{children}</Typography>;
}

export default TitleManager;
