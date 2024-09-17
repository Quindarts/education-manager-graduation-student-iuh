import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import useMemberGroupLecturer from '@/hooks/api/useQueryMemberGroupLecturer';
import { Icon } from '@iconify/react';
import TitleManager from '@/components/ui/Title';

import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const convertLecturer = (lterms: any) => {
  let updateLecturers: any[] = [];
  if (lterms == null) {
    return [];
  } else
    lterms?.map((lect: any) => {
      updateLecturers.push({
        _id: lect.lecturer?.id,
        name: lect.lecturer?.fullName + ' - ' + lect?.lecturer?.username,
      });
    });
  return updateLecturers;
};
function AddMemberGroupLecturerModal(props: any) {
  const { onClose, open, groupType } = props;
  const [lecturer, setlecturer] = useState<string>('');
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grLecturerId = `${current[current.length - 1]}`;

  const { handleGetListLecturerTerms } = useLecturerTerm();
  const { data, isLoading, isFetching } = handleGetListLecturerTerms();

  const { onAddMemberToGroupLecturer } = useMemberGroupLecturer();
  const { mutate: addMember } = onAddMemberToGroupLecturer(grLecturerId);
  const handleSubmit = () => {
    addMember(lecturer);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box m={10}>
    

        <Box my={10}>
          {isLoading || isFetching ? (
            <SekeletonUI />
          ) : (
            <FormControl sx={{ width: '100%' }}>
              <DropDown
                onChange={(e: any) => {
                  setlecturer(e.target.value);
                }}
                options={convertLecturer(data.lecturerTerms)}
              />
            </FormControl>
          )}
        </Box>
        <Box mt={12} sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={onClose} sx={{ width: '50%' }} variant='contained' color='primary'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            type='submit'
            sx={{ width: '50%' }}
            variant='contained'
            color={'error'}
          >
            <Icon width={20} icon='radix-icons:plus' />
            Thêm Giảng viên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddMemberGroupLecturerModal;
