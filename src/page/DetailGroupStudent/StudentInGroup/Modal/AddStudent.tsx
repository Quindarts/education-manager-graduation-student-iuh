import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
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

const names = ['Lê Minh Quang - mssv: 21089141', 'Lê Văn Long - mssv: 21029291'];

function AddStudentModal(props: any) {
  const { onClose, open, groupStudentId } = props;
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box m={10}>
        <Typography mb={4} fontWeight={600} variant='h3'>
          Thêm sinh viên vào nhóm
        </Typography>
        <Box my={10}>
          <FormControl sx={{ width: '100%' }}>
            <Select
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id='select-multiple-chip' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={12} sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={onClose} sx={{ width: '50%' }} variant='contained' color='primary'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button type='submit' sx={{ width: '50%' }} variant='contained' color={'error'}>
            <Icon width={20} icon='radix-icons:plus' />
              Thêm sinh viên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddStudentModal;
