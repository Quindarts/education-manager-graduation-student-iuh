import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ModalStatusArticleProps } from '../context';
import useArticle from '@/hooks/api/useQueryArticle';

function AcceptArticleModal(props: any) {
  const { onClose, open, articleId, name, bonnusScore } = props;
  const { onUpdateStatusArticle } = useArticle();
  const [comment, setComment] = useState('Đủ điều kiện duyệt.');
  const [bonusScore, setBonusScore] = useState(bonnusScore ? bonnusScore : 1);
  const { mutate: updateAccept } = onUpdateStatusArticle(articleId as string);
  const handleSubmit = () => {
    updateAccept({ status: 'APPROVED', comment: comment, bonusScore: bonusScore });
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
        <Typography variant='h5' textAlign={'center'} textTransform={'lowercase'} mt={10} mb={14}>
          Bạn có chắc chắn muốn duyệt bài báo ?
          <Typography variant='body1' fontSize={14} fontWeight={'bold'} color='grey.700'>
            {name}
          </Typography>
        </Typography>
        <Box width={'100%'}>
          <CustomTextField
            placeholder='1'
            value={bonusScore}
            type='number'
            inputProps={{ step: '0.1' }}
            onChange={(e) => setBonusScore(e.target.value)}
            label='Điểm cộng'
          />
          <Typography variant='body1' textAlign={'start'} mb={2} color='grey.700'>
            Lưu ý: Điểm cộng tối đa là 4 điểm cho một sinh viên
          </Typography>
        </Box>
        <Box width={'100%'} mt={4}>
          <CustomTextField
            placeholder='Lí do duyệt bài báo'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            label='Lý do duyệt'
            multiline
            rows={4}
          />
        </Box>

        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '20%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} sx={{ width: '80%' }} color='success' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='subway:tick' />
            Duyệt bài báo
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default AcceptArticleModal;
