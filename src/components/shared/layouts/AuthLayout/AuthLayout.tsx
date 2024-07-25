import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { color } from '@/theme/variables/palette';

function AuthLayout() {
  
  return (
    <Container
      maxWidth={false}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        padding: '0px!important',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: '0px',
          right: '0px',
          left: '0px',
          bottom: '0px',
          backgroundColor: 'grey.100',
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          backgroundImage: 'url(/images/auth-bg.jpg)',
          width: '100%',
          height: '380px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            opacity: '0.5',
            background: `linear-gradient(to right bottom, ${color.dark_indigo}, ${color.indigo})`,
          }}
        ></Box>
        <Box
          component='img'
          src='/images/shape.svg'
          alt='Shape'
          sx={{ position: 'absolute', width: '100%', bottom: '0px' }}
        />
      </Box>

      <Container
        maxWidth='xs'
        sx={{
          zIndex: 10,
          position: 'absolute',
          top: '50%',
          right: '50%',
          transform: 'translateY(-40%) translateX(50%)',
        }}
      >
        <Outlet />
      </Container>
    </Container>
  );
}

export default AuthLayout;
