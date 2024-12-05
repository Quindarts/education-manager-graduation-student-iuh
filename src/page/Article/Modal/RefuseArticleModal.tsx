import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ModalStatusArticleProps } from '../context';
import useArticle from '@/hooks/api/useQueryArticle';

function RefuseArticleModal(props: ModalStatusArticleProps) {
  const { onClose, open, name, articleId } = props;
  const { onUpdateStatusArticle } = useArticle();
  const [comment, setComment] = useState('Xin lỗi, bài báo của bạn không đủ điều kiện để duyệt.');

  const { mutate: updateReject } = onUpdateStatusArticle(articleId as string);

  const handleSubmit = () => {
    updateReject({ status: 'REJECTED', comment: comment, bonusScore: 0 });
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
        <Typography variant='h5' textAlign={'center'} textTransform={'lowercase'} mt={10} mb={14}>
          Bạn có chắc chắn từ chối bài báo {name}?
        </Typography>
        <Box width={'100%'}>
          <CustomTextField
            placeholder='Lí do từ chối bài báo'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
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
            Từ chối bài báo
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RefuseArticleModal;
