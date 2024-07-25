import { Box } from '@mui/material';
import React from 'react';
import TitleManager from '../Title';

function PromotionTextContent() {
  return (
    <Box
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      display={'flex'}
      width={'100%'}
    >
      <img height={200} width={200} src='/public/images/workers.png' />
      <TitleManager mb={10} color={'grey.400'} textTransform={'uppercase'} variant='h1'>
        Tính năng này đang được phát triển
      </TitleManager>
    </Box>
  );
}

export default React.memo(PromotionTextContent);
