import { Icon } from '@iconify/react';
import { Box, Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import SearchInput from './SearchInput';

function HeaderFinalReport() {
  return (
    <Box mb={4} display={'flex'} justifyContent={'end'} flexWrap={'wrap'} gap={2}>
      <Box flex={1} display={'flex'} gap={2} width={''}>
        <SearchInput />
      </Box>
    </Box>
  );
}

export default React.memo(HeaderFinalReport);
