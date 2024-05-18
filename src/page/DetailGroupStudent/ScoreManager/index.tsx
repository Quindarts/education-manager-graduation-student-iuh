import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import React from 'react';

function ScoreManagerPage() {
  return (
    <Box>
      <Accordion sx={{ px: 10 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon color='primary' />}
          aria-controls='panel-topic-content'
          id='panel-topic-header'
        >
          <Typography variant='h6' fontWeight={600}>
            Chấm điểm hướng dẫn
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box pb={8}>
            <Stack spacing={1}>
              <LinearProgress />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='rectangular' height={60} />
              <Skeleton variant='rounded' height={60} />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ px: 10 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon color='primary' />}
          aria-controls='panel-topic-content'
          id='panel-topic-header'
        >
          <Typography variant='h6' fontWeight={600}>
            Chấm phản biện
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box pb={8}>
            <Stack spacing={1}>
              <LinearProgress />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='rectangular' height={60} />
              <Skeleton variant='rounded' height={60} />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ px: 10 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon color='primary' />}
          aria-controls='panel-topic-content'
          id='panel-topic-header'
        >
          <Typography variant='h6' fontWeight={600}>
            Chấm hội đồng
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box pb={8}>
            <Stack spacing={1}>
              <LinearProgress />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='rectangular' height={60} />
              <Skeleton variant='rounded' height={60} />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ScoreManagerPage;
