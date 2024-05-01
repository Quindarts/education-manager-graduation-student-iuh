import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface TittleManagerPropsType extends TypographyProps {
  icon?: string;
}
function TitleManager(props: TittleManagerPropsType) {
  const { icon, children, ...rest } = props;
  return (
    <Typography fontWeight={600} variant='h3' color='primary.main' {...rest}>
      {children}
    </Typography>
  );
}

export default TitleManager;
