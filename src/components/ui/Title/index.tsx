import { Icon } from '@iconify/react';
import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface TittleManagerPropsType extends TypographyProps {
  icon?: string;
}
function TitleManager(props: TittleManagerPropsType) {
  const { icon, children, fontWeight = 600, color = 'primary.main', ...rest } = props;
  return (
    <Typography fontWeight={fontWeight} variant='h5' color={`${color}`} {...rest}>
      {icon && (
        <Icon
          width={24}
          height={24}
          style={{ position: 'relative', top: 7, marginRight: 4 }}
          icon={icon}
        />
      )}
      {children}
    </Typography>
  );
}

export default React.memo(TitleManager);
