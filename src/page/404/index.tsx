import styled from '@emotion/styled';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
} from '@mui/material';
import { Icon } from '@iconify/react';

const TextStyled = styled(Box)`
  text-align: center;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

const ImageStyled = styled(Box)`
  display: flex;
  width: 420px;
  align-self: center;
  justify-content: center;
  margin: auto;
`;

const LinkStyled = styled(Button)`
  color: #ffffff;
  font-size: 20px;
  position: relative;
  background-color: none;
  &:hover {
    transition: color 0.5s;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      height: 2px;
      width: 100%;
      background-color: #b5e2ff;
      transition: width 0.5s ease-in-out;
    }
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 2px;
    width: 0;
    background-color: #b5e2ff;
    transition: width 0.5s ease-in-out;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <Box bgcolor={'#08387f'} justifyContent={'center'} display={'flex'} height={'100vh'}>
      <TextStyled>
        <Box sx={{ display: 'block', padding: '40px 40px', width: '690px', textAlign: 'left' }}>
          <Typography
            variant='h4'
            sx={{ color: '#ffffff', fontSize: '60px', fontWeight: 700, marginBottom: '30px' }}
          >
            Không tìm thấy trang
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontSize: '30px', color: '#fff', marginBottom: '15px', lineHeight: '3rem' }}
          >
            Chúng tôi không tìm thấy trang bạn đang tìm kiếm hoặc trang bạn tìm kiếm không tồn tại.
            Xin hãy kiểm tra lại URL.
          </Typography>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '15px',
              marginLeft: '30px',
              listStyle: 'disc',
            }}
          >
            <ListItem>
              <ListItemIcon>
                <Icon height={10} width={10} icon='material-symbols:circle' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <LinkStyled disableRipple href='/'>
                    Trở về trang chủ
                  </LinkStyled>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Icon height={10} width={10} icon='material-symbols:circle' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <LinkStyled sx={{ bgcolor: '#08387f' }} disableRipple href='/'>
                    Liên hệ với chúng tôi
                  </LinkStyled>
                }
              />
            </ListItem>
          </List>
        </Box>
        <ImageStyled>
          <img
            className='image'
            src='/images/errorimg.webp'
            alt=''
            style={{ maxWidth: '100%', maxHeight: 500 }}
          />
        </ImageStyled>
      </TextStyled>
    </Box>
  );
};

export default NotFoundPage;
