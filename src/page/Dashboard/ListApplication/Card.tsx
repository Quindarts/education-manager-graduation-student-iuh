import { Icon } from '@iconify/react';
import { Box, Button, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';

function CardApplication(props: any) {
  const { tag = '', title = '', icon, link = '/', ...rest } = props;
  return (
    <Box minWidth={100} sx={{ cursor: 'pointer' }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          width: 170,
        }}
        {...rest}
      >
        <Typography fontWeight={500} color='text.secondary'>
          {tag}
        </Typography>
        <Box>
          <Icon width={30} icon={icon} />
        </Box>
        <Typography
          variant='body2'
          textTransform={'uppercase'}
          fontWeight={700}
          textAlign={'center'}
          color='primary.main'
          gutterBottom
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Xem chi tiet</Button>
      </CardActions>
    </Box>
  );
}

export default CardApplication;
