import { Icon } from '@iconify/react';
import { Box, Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import ExportExcelButton from '@/components/ui/Export';
import SearchInput from './SearchInput';

function HeaderEvent({ countGroups }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };


  return (
    <Box mb={4} display={'flex'} justifyContent={'end'} flexWrap={'wrap'} gap={2}>
      <Box flex={1} display={'flex'} gap={2} width={''}>
        <SearchInput />
      </Box>
      <Tooltip title='Tạo sự kiện'>
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
    </Box>
  );
}

export default React.memo(HeaderEvent);
