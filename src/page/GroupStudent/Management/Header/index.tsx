import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddGroupStudentModal from '../Modal/AddModal/Add';
import useParams from '@/hooks/ui/useParams';
import SplitButton from '@/components/ui/SplitButton';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import ExportExcelButton from '@/components/ui/Export';

const SEARCH_DROP_VALUE = [
  {
    _id: 'name',
    name: 'Tên nhóm',
  },
];
function HeaderGroupStudent({ countGroups }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const {
    onSearchChange,
    getQueryField,
    onTypeSearchChange,
    setDefaultTypeSearch,
    handleFocused,
    setTypeSort,
  } = useParams();
  const [sort, setSort] = useState('ASC');
  const optionSort = ['Tăng dần', 'Giảm dần'];
  const handleClick = (index: number) => {
    if (index === 0) setSort('ASC');
    else if (index === 1) setSort('DESC');
  };
  useEffect(() => {
    setTypeSort(sort);
  }, [sort]);

  const { onImportGroupStudent, handleGetExportGroupStudent } = useGroupStudent();
  const { mutate: importGr } = onImportGroupStudent();
  const handleImport = () => {
    importGr();
  };
  const { data: fetchGroup } = handleGetExportGroupStudent();
  return (
    <Box mb={4} display={'flex'} justifyContent={'end'} flexWrap={'wrap'} gap={2}>
      <Box flex={1} display={'flex'} gap={2} width={''}>
        <Box display={'flex'} gap={2}>
          <DropDown
            value={getQueryField('searchField') ? getQueryField('searchField') : 'name'}
            onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
            options={SEARCH_DROP_VALUE}
          />
          <Box width={119}>
            <SplitButton icon='bx:sort' options={optionSort} handleClick={handleClick} />
          </Box>
        </Box>

        <TextField
          fullWidth
          size='small'
          defaultValue={getQueryField('keywords')}
          onChange={onSearchChange}
          onBlur={() => handleFocused(false)}
          placeholder='Tim kiếm nhóm sinh viên theo tên nhóm'
        />
      </Box>
      <Tooltip title='Tạo nhóm'>
        <Button
          size='small'
          onClick={handleOpenModal}
          color='error'
          type='button'
          variant='contained'
        >
          <Icon icon='lets-icons:add-round' width={20} />
        </Button>
      </Tooltip>
      <Tooltip title='Import nhóm từ dữ liệu sinh viên'>
        <Button disabled={countGroups > 0} size='small' variant='contained' onClick={handleImport}>
          <Icon icon='clarity:import-line' width={20} />
        </Button>
      </Tooltip>
      <ExportExcelButton
        data={fetchGroup?.groupStudents}
        entity='groupStudent'
        label=''
        labelTooltip=''
        disabled
      />

      {/* <MenuButton /> */}
      <AddGroupStudentModal open={openAddModal} onClose={handleCloseAddModal} />
    </Box>
  );
}

export default React.memo(HeaderGroupStudent);
