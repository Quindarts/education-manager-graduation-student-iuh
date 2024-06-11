import { Box, Card, Checkbox, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function CardStudentGroup(props: any) {
  const { handleSetCurrentGroupChecked, group_id } = props;

  return (
    <Card sx={{ display: 'flex', gap: 4, px: 4, py: 2 }}>
      <Box>
        <Checkbox
          color='success'
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          onChange={(e: any) => handleSetCurrentGroupChecked(group_id, e.target.checked)}
        />
      </Box>
      <Box>
        <Typography color='primary' variant='body1'>
          Tên đề tài
          <Typography ml={2} component={'span'} variant='body1' color='grey.700'>
            Hệ thống chấm điểm IUH Hệ thống chấm điểm IUH
          </Typography>
          <Typography color='primary' variant='body1'>
            Nhóm
            <Typography ml={2} component={'span'} variant='body1' color='grey.700'>
              {group_id}
            </Typography>
          </Typography>
        </Typography>
      </Box>
    </Card>
  );
}

export default CardStudentGroup;
