import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import { useAuth } from '@/hooks/api/useAuth';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

function AcceptTopicModal(props: any) {
  const { onClose, open, topicId } = props;
  const { onUpdateStatusTopic } = useTopic();
  const { lecturerStore } = useAuth();
  const { termStore } = useTerm();
  const [note, setNote] = useState('Đủ điều kiện duyệt.');
  const { mutate: updateAcceptTopic } = onUpdateStatusTopic(
    topicId,
    lecturerStore.me.majorId,
    termStore.currentTerm.id,
  );
  const handleSubmit = () => {
    updateAcceptTopic({ status: 'APPROVED', note: note });
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
        <Box borderRadius='50%' padding={6} sx={{ background: 'rgba(49, 255, 159, 0.2)' }}>
          <Icon color='#0F9B6CD4' height={70} width={70} icon='subway:tick' />
        </Box>
        <Typography variant='h3' mt={10} mb={14}>
          Bạn có chắc chắn muốn duyệt đề tài này ?
        </Typography>
        <Box width={'100%'}>
          <CustomTextField
            placeholder='Lí do duyệt đề tài'
            onChange={(e) => setNote(e.target.value)}
            value={note}
            label='Lý do duyệt'
            multiline
            rows={4}
          />
        </Box>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} sx={{ width: '50%' }} color='success' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='subway:tick' />
            Duyệt đề tài
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default AcceptTopicModal;
