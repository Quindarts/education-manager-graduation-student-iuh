import { Chip } from '@mui/material';
import React from 'react';

interface ChipTagPropTypes extends React.ComponentProps<typeof Chip> {
  label?: string;
  variant?: 'outlined' | 'filled';
}

const ChipTag: React.FC<ChipTagPropTypes> = ({ sx, variant = 'outlined', ...rest }) => {
  return (
    <Chip
      {...rest}
      size='small'
      sx={{ ...sx, cursor: 'pointer', my: 1 }}
      variant={variant}
      clickable
    />
  );
};

export default ChipTag;
