import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';
import useSearch from '@/hooks/ui/useParams';
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
function HeaderStudent() {
  const { termStore } = useTerm();
  const { majorStore } = useMajor();

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const { onSearchChange, getQueryField, onTypeSearchChange, handleFocused } = useSearch();
  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} display={'flex'} gap={2} width={'full'}>
          <Box width={200}>
            <DropDown
              placeholder='Tìm kiếm theo'
              value={getQueryField('searchField') ? getQueryField('searchField') : 'username'}
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
        <ModalUpload entityUpload={TypeEntityUpload.STUDENT} majorId={majorStore.currentMajor.id} />
        {/* <Button
          size='small'
          onClick={handleOpenModal}
          color='primary'
          type='button'
          variant='contained'
        >
          Khóa tài khoản
        </Button> */}
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default React.memo(HeaderStudent);
