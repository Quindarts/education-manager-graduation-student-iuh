import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

export const checkIsTopic = (value: boolean) => {
  if (value === true) return 'Có';
  if (value === false) return 'Chưa có';
};

export const getNameStatus = (value: string) => {
  if (value === 'REJECTED') return 'Không duyệt';
  if (value === 'PENDING') return 'Chờ duyệt';
  if (value === 'APPROVED') return 'Đã duyệt';
};

export const getColorStatusTopic = (text: string) => {
  switch (text) {
    case 'REJECTED':
      return '#831e1b';
    case 'PENDING':
      return '#245368';
    case 'APPROVED':
      return '#22552e';
  }
};
export const getbgColorStatusTopic = (text: string) => {
  switch (text) {
    case 'REJECTED':
      return '#f8e3e2';
    case 'PENDING':
      return '#d7f8fd';
    case 'APPROVED':
      return '#e2fbe8';
  }
};

export const getIconTopic = (text: string) => {
  switch (text) {
    case 'REJECTED':
      return (
        <Icon
          style={{ marginLeft: 2, marginTop: 2 }}
          width={14}
          icon='fluent-mdl2:status-error-full'
        />
      );
    case 'PENDING':
      return (
        <Icon style={{ marginLeft: 2, marginTop: 2 }} width={14} icon='material-symbols:progress-activity' />
      );
    case 'APPROVED':
      return <Icon style={{ marginLeft: 2, marginTop: 2 }} width={14} icon='typcn:tick' />;
  }
};

export const getCardTopicStatus = (text: string) => {
  const color = getColorStatusTopic(text);
  const bgColor = getbgColorStatusTopic(text);
  const icon = getIconTopic(text);
  const name = getNameStatus(text);

  return (
    <Box
      px={2}
      width={'100%'}
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
