import Modal from '@/components/ui/Modal';
import { useAuth } from '@/hooks/api/useAuth';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';

function AcceptTopicModal(props: any) {
  const { onClose, open, topic_id } = props;
  const { onUpdateStatusTopic } = useTopic();
  const { lecturerStore } = useAuth();
  const { mutate: updateAcceptTopic } = onUpdateStatusTopic(topic_id, lecturerStore.me.id, 1);

  const handleSubmit = () => {
    updateAcceptTopic({ status: 'APPROVED' });
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
