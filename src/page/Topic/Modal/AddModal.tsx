import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, TextareaAutosize } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';

function AddModal(props: any) {
  const { onClose, open } = props;
  const [valueDescripTopic, setValueDescripTopic] = useState('');
  const [valueNoteTopic, setValueNoteTopic] = useState('');
  const [valueTargetTopic, setValueTargetTopic] = useState('');
  const [valueRequireInput, setValueRequireInput] = useState('');
  const [valueStandardOutput, setValueStandardOutput] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Modal maxWidth='lg' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo đề tài mới
        </TitleManager>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField required label='Tên đề tài' placeholder='Tên đề tài' />
          <CustomTextField
            required
            type='number'
            label='Số lượng nhóm đăng ký tối đa'
            placeholder='Số lượng đề tài'
          />
          <Box my={4}>
            <TextEditor
              handleSetValue={setValueDescripTopic}
              value={valueDescripTopic}
              label='Mô tả'
            />
          </Box>
          <Box my={4}>
            <TextEditor handleSetValue={setValueNoteTopic} value={valueNoteTopic} label='Ghi chú' />
          </Box>{' '}
          <Box my={4}>
            <TextEditor
              handleSetValue={setValueTargetTopic}
              value={valueTargetTopic}
              label='Mục tiêu đề tài'
            />
          </Box>{' '}
          <Box my={4}>
            <TextEditor
              handleSetValue={setValueRequireInput}
              value={valueRequireInput}
              label='Yêu cầu đầu vào'
            />
          </Box>
          <Box my={4}>
            <TextEditor
              handleSetValue={setValueStandardOutput}
              value={valueStandardOutput}
              label='Chuẩn đầu ra'
            />
          </Box>
          <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
            <Button variant='contained' color='primary' onClick={onClose}>
              <Icon icon='mdi:close-outline' />
              Hủy
            </Button>
            <Button variant='contained' color='success' type='submit'>
              <Icon icon='material-symbols:save-outline' />
              Lưu thông tin
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddModal;
