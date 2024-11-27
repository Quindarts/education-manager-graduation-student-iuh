import { Icon } from '@iconify/react';
import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface TittleManagerPropsType extends TypographyProps {
  icon?: string;
}
function TitleManager(props: TittleManagerPropsType) {
  const { icon, children, fontWeight = 600, color = 'grey.700', ...rest } = props;
  return (
    <Typography fontWeight={fontWeight} fontSize={14} variant='h6' color={`${color}`} {...rest}>
      {icon && (
        <Icon
          width={20}
          height={20}
          style={{ position: 'relative', top: 5.5, marginRight: 4 }}
          icon={icon}
        />
      )}
      {children}
    </Typography>
  );
}

export default React.memo(TitleManager);
