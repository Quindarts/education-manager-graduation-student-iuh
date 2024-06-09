import Modal from '@/components/ui/Modal';
import { useAuth } from '@/hooks/api/useAuth';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';

function RefuseTopicModal(props: any) {
  const { onClose, open, topic_id } = props;
  const { onUpdateStatusTopic } = useTopic();
  const { lecturerStore } = useAuth();
  const { termStore } = useTerm();
  const { mutate: updateAcceptTopic } = onUpdateStatusTopic(
    topic_id,
    lecturerStore.me.majorId,
    termStore.currentTerm.id,
  );

  const handleSubmit = () => {
    updateAcceptTopic({ status: 'REJECTED' });
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
