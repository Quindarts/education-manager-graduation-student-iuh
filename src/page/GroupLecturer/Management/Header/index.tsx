import DropDown from '@/components/ui/Dropdown';
import ExportExcelButton from '@/components/ui/Export';
import useAssign from '@/hooks/api/useQueryAssign';
import { APP_ROUTES } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import { Box, Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGroupModal from '../Modal/CreateGroupModal';

function HeaderGroupLecturer(props: any) {
  const { handleTypeGroupLecturer } = props;
  const [currentTypeGroupLecturer, setCurrentTypeGroupLecturer] = useState('reviewer');
  useEffect(() => {
    handleTypeGroupLecturer(currentTypeGroupLecturer);
  }, [currentTypeGroupLecturer]);
  const { handleGetExportAssignGroup } = useAssign();
  const { data: fetchGroup } = handleGetExportAssignGroup(currentTypeGroupLecturer);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };
  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };
  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} justifyContent={'end'} display={'flex'} gap={2} width={'full'}>
          <DropDown
            value={currentTypeGroupLecturer}
            onChange={(e: any) => {
              setCurrentTypeGroupLecturer(e.target.value);
            }}
            options={[
              {
                name: 'Nhóm Phản biện',
                _id: 'reviewer',
              },
              {
                name: 'Nhóm Poster',
                _id: 'report_poster',
              },
              {
                name: 'Nhóm Hội đồng',
                _id: 'report_council',
              },
            ]}
          />
          <Tooltip title='Tạo Nhóm '>
            <Button
              size='small'
              onClick={handleOpenModalCreate}
              color='error'
              type='button'
              variant='contained'
            >
              <Icon icon='lets-icons:add-round' width={20} />
            </Button>
          </Tooltip>
          <ExportExcelButton
            data={fetchGroup?.assigns}
            entity='assignGroup'
            label=''
            labelTooltip=''
            disabled
          />
        </Box>
      </Box>

      <CreateGroupModal onClose={handleCloseModalCreate} open={openModalCreate} />
    </>
  );
}

export default HeaderGroupLecturer;
