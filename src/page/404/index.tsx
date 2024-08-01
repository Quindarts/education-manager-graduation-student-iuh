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
const NotFoundPage: React.FC = () => {
  const containerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #08387f;
  `;

  const textStyle = css`
    text-align: center;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
  `;

  const imageStyle = css`
    display: flex;
    width: 420px;
    align-self: center;
    justify-content: center;
    margin: auto;
  `;

  const linkStyle = css`
    color: #ffffff;
    font-size: 20px;
    position: relative;
    bg-color: none;
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

  return (
    <Container maxWidth='xl' css={containerStyle}>
      <Box css={textStyle}>
        <Box css={{ display: 'block', padding: '40px 40px', width: '690px', textAlign: 'left' }}>
          <Typography
            variant='h4'
            css={{ color: '#ffffff', fontSize: '60px', fontWeight: 700, marginBottom: '30px' }}
          >
            Không tìm thấy trang
          </Typography>
          <Typography
            variant='body1'
            css={{ fontSize: '30px', color: '#fff', marginBottom: '15px', lineHeight: '3rem' }}
          >
            Chúng tôi không tìm thấy trang bạn đang tìm kiếm hoặc trang bạn tìm kiếm không tồn tại.
            Xin hãy kiểm tra lại URL.
          </Typography>
          <List
            css={{
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
                  <Button disableRipple href='#' css={linkStyle}>
                    Trở về trang chủ
                  </Button>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Icon height={10} width={10} icon='material-symbols:circle' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Button sx={{ bgcolor: '#08387f' }} disableRipple href='#' css={linkStyle}>
                    Liên hệ với chúng tôi
                  </Button>
                }
              />
            </ListItem>
          </List>
        </Box>
        <Box css={imageStyle}>
          <img
            className='image'
            src='https://omjsblog.files.wordpress.com/2023/07/errorimg.png'
            alt=''
            style={{ maxWidth: '100%', maxHeight: 500 }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
