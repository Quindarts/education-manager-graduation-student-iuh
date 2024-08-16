import React, { useEffect, useState } from 'react';
import AddNotificationModal from '../Modal/AddModal';
import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper, TextField, Tooltip } from '@mui/material';
import DropDown from '@/components/ui/Dropdown';
import useParams from '@/hooks/ui/useParams';
import { Icon } from '@iconify/react';
const DROP_SEARCH_VALUE = [
  {
    _id: 'senderName',
    name: 'Họ tên người gửi',
  },
  {
    _id: 'title',
    name: 'Tiêu đề thông báo',
  },
];
function HeaderNotification() {
  //[Handler Modal ]
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseModal = () => {
    setOpenAddModal(false);
  };
  const onDefaultSearchDrop = () => {
    getQueryField('searchField')
      ? getQueryField('searchField')
      : setDefaultTypeSearch('senderName');
    return;
  };
  useEffect(() => {
    getQueryField('searchField')
      ? getQueryField('searchField')
      : setDefaultTypeSearch('senderName');
  }, []);
  const { onSearchChange, getQueryField, setDefaultTypeSearch, onTypeSearchChange } = useParams();
  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} display={'flex'} gap={2} width={'full'}>
          <Box width={200}>
            <DropDown
              placeholder='Tìm kiếm thông báo theo'
              value={getQueryField('searchField') ? getQueryField('searchField') : 'senderName'}
              onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
              options={DROP_SEARCH_VALUE}
            />
          </Box>
          <TextField
            fullWidth
            size='small'
            defaultValue={getQueryField('keywords')}
            onChange={onSearchChange}
            placeholder='Tim kiếm thông báo theo..'
          />
        </Box>
        <Tooltip title='Thêm thông báo'>
          <Button onClick={handleOpenAddModal} color='error' variant='contained' size='small'>
            <Icon width={20} icon='ph:plus-fill' />
          </Button>
        </Tooltip>
      </Box>
      <>
        <AddNotificationModal open={openAddModal} onClose={handleCloseModal} />
      </>
    </>
  );
}

export default HeaderNotification;
