import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddLecturerModal from '../Modal/AddModal';
import { ENUM_RENDER_LECTURER } from '@/store/slice/lecturer.slice';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import useSearch from '@/hooks/ui/useParams';

const DROP_SEARCH_VALUE = [
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_FULLNAME,
    name: 'Tên giảng viên',
  },
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_USERNAME,
    name: 'Mã giảng viên',
  },
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_PHONE,
    name: 'Số điện thoại',
  },
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_EMAIL,
    name: 'Email',
  },
];

function HeaderLecturerTerm() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const { onImportLecturerTerm } = useLecturerTerm();
  const { mutate: importLecturer } = onImportLecturerTerm();
  const { onSearchChange, getQueryField, onTypeSearchChange, handleFocused } = useSearch();

  const handleImport = () => {
    importLecturer();
  };
  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} display={'flex'} gap={4} width={'full'}>
          <Box width={200}>
            <DropDown
              defaultValue={
                getQueryField('searchField') ? getQueryField('searchField') : 'username'
              }
              onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
              options={DROP_SEARCH_VALUE}
            />
          </Box>
          <TextField
            fullWidth
            size='small'
            defaultValue={getQueryField('keywords')}
            onChange={onSearchChange}
            onBlur={() => handleFocused(false)}
            placeholder='Tim kiếm giảng viên HD theo..'
          />
        </Box>
        <Button color='primary' variant='contained' onClick={handleImport}>
          <Icon icon='fe:import' />
          Tải dữ liệu GV học kì trước
        </Button>
        <Button
          size='small'
          color='error'
          type='button'
          onClick={handleOpenModal}
          variant='contained'
        >
          <Icon icon='lets-icons:add-round' width={20} />
          Thêm giảng viên HD
        </Button>
      </Box>
      <AddLecturerModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderLecturerTerm;
