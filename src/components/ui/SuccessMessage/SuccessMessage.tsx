import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import icon_check from '../../../../public/images/icon_check.png';
const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box zIndex={40}>
        <Box component='section' textAlign='center'>
          <Box display='flex' justifyContent='center' p={10}>
            <Box
              px={10}
              py={2}
              borderRadius='50%'
              sx={{ bgcolor: 'grey.100' }}
            >
              <img src={icon_check} width={70} height={70} />
            </Box>
          </Box>
          <Typography variant='h5' color='grey.700' fontWeight={600}>
            Well done !
          </Typography>
          <Typography color='grey.500' fontWeight={300}>
            Aww yeah, you successfully read this important message.
          </Typography>
          <Button
            type='submit'
            sx={{my:5}}
            onClick={() => {
              navigate('/');
            }}
          >
            Back to Register
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default SuccessMessage;
