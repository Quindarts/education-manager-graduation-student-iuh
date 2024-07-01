import DropDown from '@/components/ui/Dropdown';
import { APP_ROUTES } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderGroupLecturer(props: any) {
  const { handleTypeGroupLecturer } = props;
  const navigate = useNavigate();
  const [currentTypeGroupLecturer, setCurrentTypeGroupLecturer] = useState('reviewer');
  useEffect(() => {
    handleTypeGroupLecturer(currentTypeGroupLecturer);
  }, [currentTypeGroupLecturer]);

  return (
    <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
      <Box flex={1} justifyContent={'end'} display={'flex'} gap={2} width={'full'}>
        <DropDown
          value={currentTypeGroupLecturer}
          onChange={(e: any) => {
            setCurrentTypeGroupLecturer(e.target.value);
          }}
          options={[
            {
              name: 'Nhóm giảng viên Phản biện',
              _id: 'reviewer',
            },
            {
              name: 'Nhóm giảng viên Poster',
              _id: 'report_poster',
            },
            {
              name: 'Nhóm giảng viên Hội đồng',
              _id: 'report_council',
            },
          ]}
        />
        <Button
          size='small'
          onClick={() => navigate(APP_ROUTES.GROUP_LECTURER.CREATE)}
          color='error'
          type='button'
          variant='contained'
        >
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo Nhóm giảng viên
        </Button>
      </Box>
    </Box>
  );
}

export default HeaderGroupLecturer;
