import { Typography, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Icon } from '@iconify/react';
import { TextStyled, ImageStyled, LinkStyled } from './style';

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
