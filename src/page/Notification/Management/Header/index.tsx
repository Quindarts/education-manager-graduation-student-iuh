import React, { useEffect, useState } from 'react';
import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper, TextField, Tooltip } from '@mui/material';
import DropDown from '@/components/ui/Dropdown';
import useParams from '@/hooks/ui/useParams';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { RoleCheck } from '@/types/enum';
const DROP_SEARCH_VALUE = [
  {
    _id: 'title',
    name: 'Tiêu đề thông báo',
  },
];
function HeaderNotification() {
  const { currentRoleRender } = useLecturer();

  const onDefaultSearchDrop = () => {
    getQueryField('searchField') ? getQueryField('searchField') : setDefaultTypeSearch('title');
    return;
  };
  useEffect(() => {
    getQueryField('searchField') ? getQueryField('searchField') : setDefaultTypeSearch('title');
  }, []);
  const navigate = useNavigate();
  const { onSearchChange, getQueryField, setDefaultTypeSearch, onTypeSearchChange } = useParams();
  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} display={'flex'} gap={2} width={'full'}>
          <Box width={200}>
            <DropDown
              placeholder='Tìm kiếm thông báo theo'
              value={getQueryField('searchField') ? getQueryField('searchField') : 'title'}
              onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
              options={DROP_SEARCH_VALUE}
            />
          </Box>
          <TextField
            fullWidth
            size='small'
            defaultValue={getQueryField('keywords')}
            onChange={onSearchChange}
            placeholder='Tim kiếm thông báo theo..'
          />
        </Box>
        <Tooltip title='Tạo thông báo'>
          <Button
            onClick={() => {
              currentRoleRender === RoleCheck.LECTURER
                ? navigate('/notifications-lecturer/create')
                : navigate('/notifications/create');
            }}
            color='error'
            variant='contained'
            size='small'
          >
            <Icon width={20} icon='ph:plus-fill' />
          </Button>
        </Tooltip>
      </Box>
    </>
  );
}

export default HeaderNotification;
