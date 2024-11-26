import { Chip } from '@mui/material';
import React from 'react';

interface ChipTagPropTypes extends React.ComponentProps<typeof Chip> {
  label?: string;
  variant?: 'outlined' | 'filled';
}

const ChipTag: React.FC<ChipTagPropTypes> = ({ sx, variant = 'outlined', ...rest }) => {
  return <Chip {...rest} sx={{ ...sx, cursor: 'pointer' }} variant={variant} clickable />;
};

export default ChipTag;
