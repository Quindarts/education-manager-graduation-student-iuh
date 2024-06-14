import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { validationTopicSchema } from '../Context';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { useTerm } from '@/hooks/api/useQueryTerm';

function AddModal(props: any) {
  const { onClose, open } = props;

  const { lecturerStore } = useAuth();
  const { termStore } = useTerm();
  const { onCreateTopicByToken } = useTopic();
  const { mutate: createTopic, isSuccess: successCreate } = onCreateTopicByToken(
    termStore.currentTerm.id,
    'e4fe02cb-f2b0-4afa-885d-d1b93130d350',
  );
  const handleSubmit = (values: any) => {
    createTopic(values);
  };
  useEffect(() => {
    onClose();
  }, [successCreate]);
  return (
    <Modal maxWidth='lg' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo đề tài mới
        </TitleManager>
        <Formik
          validationSchema={validationTopicSchema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: '',
            quantityGroupMax: 1,
            description: '',
            note: '',
            target: '',
            standardOutput: '',
            requireInput: '',
          }}
        >
          {({ handleSubmit, values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <CustomTextField
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name}
                required
                label='Tên đề tài'
                name='name'
                placeholder='Tên đề tài'
              />
              <CustomTextField
                value={`${lecturerStore.me.fullName}`}
                required
                disabled
                label='Giảng viên hướng dẫn'
                placeholder='Tên giảng viên'
              />
              <CustomTextField
                placeholder='Số lượng nhóm phải lớn hơn 0 và bé hơn 5'
                required
                name='quantityGroupMax'
                label='Số lượng nhóm đăng ký tối đa'
                value={values.quantityGroupMax}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.quantityGroupMax ? true : false}
                helperText={errors.quantityGroupMax}
              />
              <Box my={4}>
                <TextEditor
                  label='Mô tả'
                  errors={errors.description ? true : false}
                  value={values.description}
                  onChange={(value) => {
                    setFieldValue('description', value);
                  }}
                  id='description'
                  helperText={errors.description}
                  placeholder='Nhập vào mô tả đề tài'
                />
              </Box>
              <Box my={4}>
                <TextEditor
                  label='Mục tiêu đề tài'
                  errors={errors.target ? true : false}
                  value={values.target}
                  onChange={(value) => {
                    setFieldValue('target', value);
                  }}
                  id='target'
                  helperText={errors.target}
                  placeholder='Nhập vào mục tiêu đề tài'
                />
              </Box>{' '}
              <Box my={4}>
                <TextEditor
                  label='Yêu cầu đầu vào'
                  errors={errors.requireInput ? true : false}
                  value={values.requireInput}
                  onChange={(value) => {
                    setFieldValue('requireInput', value);
                  }}
                  id='requireInput'
                  helperText={errors.requireInput}
                  placeholder='Nhập vào yêu cầu đầu vào'
                />
              </Box>
              <Box my={4}>
                <TextEditor
                  label='Chuẩn đầu ra'
                  errors={errors.standardOutput ? true : false}
                  value={values.standardOutput}
                  onChange={(value) => {
                    setFieldValue('standardOutput', value);
                  }}
                  id='standardOutput'
                  helperText={errors.standardOutput}
                  placeholder='Nhập vào chuẩn đầu ra'
                />
              </Box>
              <Box my={4}>
                <TextEditor
                  onChange={(value) => {
                    setFieldValue('note', value);
                  }}
                  id='note'
                  value={values.note}
                  label='Ghi chú'
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
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddModal;
