import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

export const ENUM_SCORE_STUDENT = [
  {
    name: 'Chấm Hướng dẫn',
    _id: 'ADVISOR',
  },
  {
    name: 'Chấm Phản biện',
    _id: 'REVIEWER',
  },
  {
    name: 'Chấm Hội đồng',
    _id: 'REPORT_COUNCIL',
  },
  {
    name: 'Chấm Poster',
    _id: 'REPORT_POSTER',
  },
];
export const checkTypeEvaluation = (typeScore: string) => {
  if (typeScore === 'REPORT_COUNCIL' || typeScore === 'REPORT_POSTER') {
    return 'REPORT';
  } else if (typeScore === 'ADVISOR') return 'ADVISOR';
  else return 'REVIEWER';
};

export const getNameStatus = (value: string) => {
  if (value === 'REJECTED') return 'Đang chờ';
  if (value === 'APPROVED') return 'Đã chấm';
};

export const getColorStatusTranscript = (text: string) => {
  switch (text) {
    case 'REJECTED':
      return '#831e1b';
    case 'APPROVED':
      return '#22552e';
  }
};
export const getbgColorStatusTranscript = (text: string) => {
  switch (text) {
    case 'REJECTED':
      return '#f8e3e2';
    case 'APPROVED':
      return '#e2fbe8';
  }
};

export const getIconTranscript = (text: string) => {
  switch (text) {
    case 'REJECTED':
      return (
        <Icon
          style={{ marginLeft: 2, marginTop: 2 }}
          width={14}
          icon='fluent-mdl2:status-error-full'
        />
      );

    case 'APPROVED':
      return <Icon style={{ marginLeft: 2, marginTop: 2 }} width={14} icon='typcn:tick' />;
  }
};

export const getCardTranscriptStatus = (text: string) => {
  const color = getColorStatusTranscript(text);
  const bgColor = getbgColorStatusTranscript(text);
  const icon = getIconTranscript(text);
  const name = getNameStatus(text);

  return (
    <Box
      px={4}
      py={1}
      textAlign={'center'}
      my={'auto'}
      borderRadius={1}
      fontSize={12}
      color={`${color}`}
      bgcolor={`${bgColor}`}
    >
      {name}
      {icon}
    </Box>
  );
};
