import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface TittleManagerPropsType extends TypographyProps {
  icon?: string;
}
function TitleManager(props: TittleManagerPropsType) {
  const { icon, children, fontWeight = 600, color = 'primary.main', ...rest } = props;
  return (
    <Typography fontWeight={fontWeight} variant='h3' color={`${color}`} {...rest}>
      {children}
    </Typography>
  );
}

export default TitleManager;
