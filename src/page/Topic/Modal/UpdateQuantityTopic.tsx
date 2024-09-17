import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

function UpdateQuantityTopicModal(props: any) {
  const { onClose, open } = props;
  const { onUpdateAllQuantityGroupMax } = useTopic();
  const [quantity, setQuantity] = useState(0);
  const { mutate: updateQuantity, isSuccess } = onUpdateAllQuantityGroupMax();

  const handleSubmit = () => {
    updateQuantity(quantity);
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal onClose={onClose} open={open}>
      <TitleManager px={10} textTransform={'uppercase'} icon='ic:sharp-change-circle' variant='h6'>
        Cập nhật (tất cả)  số lượng nhóm đăng ký đề tài
      </TitleManager>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
      >
        <Box my={10} borderRadius='50%' padding={10} sx={{ background: 'rgba(255,49,111,0.2)' }}>
          <Icon color='#b31d1d82' height={70} width={70} icon='ic:sharp-change-circle' />{' '}
        </Box>
        <Box width={'100%'}>
          <CustomTextField
            onChange={(e: any) => {
              setQuantity(e.target.value);
            }}
            onBlur={(e: any) => {
              setQuantity(e.target.value);
            }}
            type='number'
            label='Nhập vào số lượng thay đổi'
          />
        </Box>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            type='submit'
            sx={{ width: '50%' }}
            color='success'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='grommet-icons:update' />
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UpdateQuantityTopicModal;
