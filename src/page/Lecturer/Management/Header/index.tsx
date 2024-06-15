import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddLecturerModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import Search from '@/components/ui/Search';
import useDebounce from '@/hooks/ui/useDebounce';

const DROP_SEARCH_VALUE = [
  {
    _id: 'full_name',
    name: 'Tên giảng viên',
  },
  {
    _id: 'username',
    name: 'Mã giảng viên',
  },
  {
    _id: 'phone',
    name: 'Số điện thoại',
  },
  {
    _id: 'email',
    name: 'Email',
  },
];

function HeaderLecturer(props: any) {
  const { handleChangeDropSearch, typeSearch, isApiLoading, handleChangeKeywords, onClearSearch } =
    props;
  const [openAddModal, setOpenAddModal] = useState(false);

  const [isLoading, setIsLoading] = useState(isApiLoading);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    handleChangeKeywords(debouncedSearchValue);
  }, [debouncedSearchValue]);
  const handleClearSearch = () => {
    setSearchValue('');
    onClearSearch();
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const { termStore } = useTerm();
  const { currentTerm } = termStore;
  return (
    <>
      <Box mb={14} display={'flex'} flexWrap={'wrap'} gap={8}>
        <Box flex={1} display={'flex'} gap={4} width={'full'}>
          <Box width={200}>
            <DropDown
              placeholder='Tìm kiếm theo'
              value={typeSearch}
              onChange={(e) => handleChangeDropSearch(e.target.value)}
              options={DROP_SEARCH_VALUE}
            />
          </Box>
          <TextField
            fullWidth
            size='small'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onBlur={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder='Tim kiếm giảng viên theo..'
          />
        </Box>
        <Button color='error' type='button' onClick={handleOpenModal} variant='contained'>
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo giảng viên
        </Button>
        <ModalUpload entityUpload={TypeEntityUpload.LECTURER} termId={currentTerm.id} />
        <Button
          color='warning'
          type='button'
          sx={{ color: 'white' }}
          onClick={handleClearSearch}
          variant='contained'
        >
          <Icon icon='carbon:clean' color='yellow' width={20} /> Làm mới
        </Button>
      </Box>
      <AddLecturerModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderLecturer;
