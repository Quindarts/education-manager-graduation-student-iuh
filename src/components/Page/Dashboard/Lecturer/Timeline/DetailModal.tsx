import Modal from '@/components/ui/Modal';
import React from 'react';
import TitleManager from '@/components/ui/Title';
import { Box } from '@mui/material';

function DetailModal({ open, part, label, onClose }) {
  return (
    <Modal onClose={onClose} open={open}>
      <Box pb={5} px={10}>
        <TitleManager mb={10} variant='h6' icon='ion:document' textTransform={'uppercase'}>
          {label}
        </TitleManager>
        <Box> </Box>
      </Box>
    </Modal>
  );
}

export default DetailModal;
