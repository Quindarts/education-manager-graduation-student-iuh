import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddLecturerModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useSearch from '@/hooks/ui/useParams';

import { ENUM_RENDER_LECTURER } from '@/store/slice/lecturer.slice';

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

function HeaderLecturer() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { onSearchChange, getQueryField, onTypeSearchChange, handleFocused, setDefaultTypeSearch } =
    useSearch();

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const { termStore } = useTerm();
  const { currentTerm } = termStore;
  const handleDefault = () => {
    setDefaultTypeSearch(ENUM_RENDER_LECTURER.SEARCH_USERNAME);
    return ENUM_RENDER_LECTURER.SEARCH_USERNAME;
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
            placeholder='Tim kiếm giảng viên theo..'
          />
        </Box>
        <Button
          size='small'
          color='error'
          type='button'
          onClick={handleOpenModal}
          variant='contained'
        >
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo Giảng viên
        </Button>
        <ModalUpload
          label='Tải lên Excel Giảng viên'
          entityUpload={TypeEntityUpload.LECTURER}
          termId={currentTerm.id}
        />
      </Box>
      <AddLecturerModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default React.memo(HeaderLecturer);
