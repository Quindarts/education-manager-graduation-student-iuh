import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useDebounce from '@/hooks/ui/useDebounce';
import { useMajor } from '@/hooks/api/useQueryMajor';
const DROP_SEARCH_VALUE = [
  {
    _id: 'full_name',
    name: 'Tên Sinh viên',
  },
  {
    _id: 'username',
    name: 'Mã Sinh viên',
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
function HeaderStudent(props: any) {
  const { handleChangeDropSearch, typeSearch, isApiLoading, handleChangeKeywords, onClearSearch } =
    props;
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  
  const [isLoading, setIsLoading] = useState(isApiLoading);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} display={'flex'} gap={2} width={'full'}>
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
            placeholder='Tim kiếm sinh viên theo..'
          />
        </Box>

        <Button
          size='small'
          onClick={handleOpenModal}
          color='error'
          type='button'
          variant='contained'
        >
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo sinh viên
        </Button>
        <ModalUpload
          entityUpload={TypeEntityUpload.STUDENT}
          majorId={majorStore.currentMajor.id}
          termId={termStore.currentTerm.id}
        />
        <Button
          size='small'
          color='warning'
          type='button'
          sx={{ color: 'white' }}
          variant='contained'
        >
          <Icon icon='carbon:clean' color='yellow' width={20} /> Làm mới
        </Button>
        <Button
          size='small'
          onClick={handleOpenModal}
          color='primary'
          type='button'
          variant='contained'
        >
          {/* <Icon icon='lets-icons:add-round' /> */}
          Khóa tài khoản
        </Button>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderStudent;
