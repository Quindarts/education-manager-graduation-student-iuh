import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AddLecturerModal from '../Modal/AddModal';
import { ENUM_RENDER_LECTURER } from '@/store/slice/lecturer.slice';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import useSearch from '@/hooks/ui/useParams';
import SplitButton from '@/components/ui/SplitButton';

const SEARCH_DROP_VALUE = [
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_FULLNAME,
    name: 'Họ tên giảng viên',
  },
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_USERNAME,
    name: 'Mã giảng viên',
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
  const handleImport = () => {
    importLecturer();
  };

  const { onSearchChange, getQueryField, onTypeSearchChange,  setTypeSort } =
    useSearch();
  const [sort, setSort] = useState('ASC');
  const optionSort = ['Tăng dần', 'Giảm dần'];
  const handleClick = (index: number) => {
    if (index === 0) setSort('ASC');
    else if (index === 1) setSort('DESC');
  };
  useEffect(() => {
    setTypeSort(sort);
  }, [sort]);

  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} display={'flex'} gap={2} width={''}>
          <Box display={'flex'} gap={2}>
            <DropDown
              value={getQueryField('searchField') ? getQueryField('searchField') : 'full_name'}
              onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
              options={SEARCH_DROP_VALUE}
            />
            <Box width={122}>
              <SplitButton icon='bx:sort' options={optionSort} handleClick={handleClick} />
            </Box>
          </Box>

          <TextField
            fullWidth
            size='small'
            defaultValue={getQueryField('keywords')}
            onChange={onSearchChange}
            placeholder='Tim kiếm giảng viên HD theo..'
          />
        </Box>
        <Tooltip title={'Thêm tất cả GV chuyên ngành tham gia HD'}>
          <Button size='small' color='primary' variant='contained' onClick={handleImport}>
            <Icon width={16} icon='fe:import' />
          </Button>
        </Tooltip>
        <Tooltip title={'Thêm giảng viên HD'}>
          <Button
            size='small'
            color='error'
            type='button'
            onClick={handleOpenModal}
            variant='contained'
          >
            <Icon icon='lets-icons:add-round' width={20} />
          </Button>
        </Tooltip>
      </Box>
      <AddLecturerModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderLecturerTerm;
