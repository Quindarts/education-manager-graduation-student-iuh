import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

function RefuseTopicModal(props: any) {
  const { onClose, open, topicId } = props;
  const { onUpdateStatusTopic } = useTopic();
  const [note, setNote] = useState(
    'Xin lỗi, đề tài của bạn không đủ điều kiện để được phép duyệt.',
  );

  const { mutate: updateAcceptTopic } = onUpdateStatusTopic(topicId);

  const handleSubmit = () => {
    updateAcceptTopic({ status: 'REJECTED', note: note });
    onClose();
  };
  return (
    <Modal onClose={onClose} open={open}>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
      >
        <Box borderRadius='50%' padding={6} sx={{ background: 'rgba(255, 49, 49, 0.2)' }}>
          <Icon color='#9B0F0FD4' height={70} width={70} icon='healthicons:refused' />
        </Box>
        <Typography variant='h3' mt={10} mb={14}>
          Bạn có chắc chắn từ chối đề tài này ?
        </Typography>
        <Box width={'100%'}>
          <CustomTextField
            placeholder='Lí do từ chối đề tài'
            onChange={(e) => setNote(e.target.value)}
            value={note}
            label='Lý do từ chối'
            multiline
            rows={4}
          />
        </Box>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} sx={{ width: '50%' }} color='error' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='healthicons:refused' />
            Từ chối đề tài
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RefuseTopicModal;
