import { Box, DialogProps, IconButton } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Zoom from '@mui/material/Zoom';
import React from 'react';
import CustomModal from './style';
import { Icon } from '@iconify/react';

interface ModalTypeProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

const Modal = (props: ModalTypeProps) => {
  const { onClose, open, children, ...restProps } = props;

  return (
    <>
      <CustomModal TransitionComponent={Transition} open={open} onClose={onClose} {...restProps}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 0 }} color='primary'>
          <Icon icon='line-md:close-small' />
        </IconButton>
        <Box mt={4} className='modal__body'>
          {children}
        </Box>
      </CustomModal>
    </>
  );
};

export default Modal;
