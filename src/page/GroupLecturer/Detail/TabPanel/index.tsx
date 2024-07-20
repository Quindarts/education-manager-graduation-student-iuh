import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { TabPanel } from '@mui/lab';
import TableManagementGroupLecturer from '@/page/DetailGroupLecturer/Management/Table';
import { Paper, Typography } from '@mui/material';
import CustomTextField from '@/components/ui/CustomTextField';
import { Icon } from '@iconify/react';

function TabPanelUI(props: any) {
  const { groupLecturer } = props;
  const [value, setValue] = React.useState('1');
  const type = groupLecturer.typeGroup;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'h4' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Thông tin chung' value='1' />
            <Tab label='Danh sách giảng viên' value='2' />
          </TabList>
        </Box>

        <TabPanel value={'1'}>
          {type === 'REVIEWER' ? (
            <Paper elevation={2} sx={{ px: 10, py: 6 }}>
              <Typography variant='h6' color='primary'>
                <Icon icon='el:list-alt' />
                Danh sách đề tài chấm điểm của nhóm
              </Typography>
              <Box mx={4} my={4}>
                <Typography variant='body1' color='initial'>
                  Đề tài 1: Xây dựng Website bán vé tàu online
                </Typography>
                <Typography variant='body1' color='initial'>
                  Đề tài 2:Tìm hiểu công nghệ WPF và ứng dụng xây dựng game ghép hình cho trẻ em
                </Typography>
                <Typography variant='body1' color='initial'>
                  Đề tài 3: Tạo ra ứng dụng về du lịch và dịch vụ bán sản phẩm.
                </Typography>
              </Box>
              <Box my={4}>
                <Typography variant='h6' color='primary'>
                  <Icon icon='tdesign:time' /> Thời gian chấm phản biện
                </Typography>
                <Box mx={4}>
                  <Typography variant='body1' color='initial'>
                    Đề tài 1: 13h Ngay 19/7/2024
                  </Typography>
                  <Typography variant='body1' color='initial'>
                    Đề tài 2: 14h Ngay 19/7/2024
                  </Typography>
                  <Typography variant='body1' color='initial'>
                    Đề tài 3: 16h Ngay 19/7/2024
                  </Typography>
                </Box>
              </Box>

              <Box my={4}>
                <Typography variant='h6' color='primary'>
                  <Icon icon='ph:link-bold' />
                  Link phòng trực tuyến
                </Typography>
                <CustomTextField
                  label={'Đề tài số 1'}
                  placeholder='https://zoom.us/fr'
                  value={'https://zoom.us/fr'}
                />
                <CustomTextField
                  label={'Đề tài số 2'}
                  placeholder='https://zoom.us/fr'
                  value={'https://zoom.us/fr'}
                />{' '}
                <CustomTextField
                  label={'Đề tài số 3'}
                  placeholder='https://zoom.us/fr'
                  value={'https://zoom.us/fr'}
                />
              </Box>

              <Box></Box>
            </Paper>
          ) : (
            <Paper elevation={2} sx={{ px: 10, py: 6 }}>
              <Typography variant='h6' color='primary'>
                <Icon icon='el:list-alt' />
                Danh sách đề tài chấm điểm của nhóm
              </Typography>
              <Box mx={4} my={4}>
                <Typography variant='body1' color='initial'>
                  Đề tài 1: Xây dựng Website bán vé tàu online
                </Typography>
                <Typography variant='body1' color='initial'>
                  Đề tài 2:Tìm hiểu công nghệ WPF và ứng dụng xây dựng game ghép hình cho trẻ em
                </Typography>
                <Typography variant='body1' color='initial'>
                  Đề tài 3: Tạo ra ứng dụng về du lịch và dịch vụ bán sản phẩm.
                </Typography>
              </Box>
              <Box my={4}>
                <Typography variant='h6' color='primary'>
                  <Icon icon='tdesign:time' /> Thời gian chấm
                </Typography>
                <Box mx={4}>
                  <Typography variant='body1' color='initial'>
                    Đề tài 1: 13h Ngay 19/7/2024
                  </Typography>
                  <Typography variant='body1' color='initial'>
                    Đề tài 2: 14h Ngay 19/7/2024
                  </Typography>
                  <Typography variant='body1' color='initial'>
                    Đề tài 3: 16h Ngay 19/7/2024
                  </Typography>
                </Box>
              </Box>

              <Box my={4}>
                <Typography variant='h6' color='primary'>
                  <Icon icon='ic:sharp-meeting-room' />
                  Phòng chấm
                </Typography>
                <CustomTextField label={'Thông tin phòng'} placeholder='A2.03' value={'A2.03'} />
              </Box>

              <Box></Box>
            </Paper>
          )}
        </TabPanel>
        <TabPanel value={'2'}>
          <TableManagementGroupLecturer groupType={type} rows={groupLecturer.members} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabPanelUI;
