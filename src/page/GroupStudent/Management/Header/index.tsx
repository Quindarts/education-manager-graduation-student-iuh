import { Icon } from '@iconify/react';
import { Box, Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddGroupStudentModal from '../Modal/AddModal/Add';
import useParams from '@/hooks/ui/useParams';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import ExportExcelButton from '@/components/ui/Export';
import SearchInput from './SearchInput';

function HeaderGroupStudent({ countGroups }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const { onImportGroupStudent, handleGetExportGroupStudent } = useGroupStudent();
  const { mutate: importGr } = onImportGroupStudent();
  const handleImport = () => {
    importGr();
  };
  const { data: fetchGroup } = handleGetExportGroupStudent();

  const { onSearchChange, getQueryField, onTypeSearchChange, handleFocused, setTypeSort } =
    useParams();

  return (
    <Box mb={4} display={'flex'} justifyContent={'end'} flexWrap={'wrap'} gap={2}>
      <Box flex={1} display={'flex'} gap={2} width={''}>
        <SearchInput />
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
