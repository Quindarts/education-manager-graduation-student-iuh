import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { validationTopicSchema } from '../Context';
import { useTopic } from '@/hooks/api/useQueryTopic';
import SekeletonUI from '@/components/ui/Sekeleton';

function EditModal(props: any) {
  const { onClose, open, topicId } = props;
  const {} = useTopic();
  const { lecturerStore } = useAuth();
  const { onUpdateTopicById, handleUiRender } = useTopic();
  const { mutate: update, isSuccess: successCreate } = onUpdateTopicById(topicId);

  const { handleTopicById } = useTopic();
  const { data: topicFetch, isLoading, isFetching } = handleTopicById(topicId);
  const handleSubmit = (values: any) => {
    update(values);
  };

  useEffect(() => {
    onClose();
  }, [successCreate]);

  const currentRole = handleUiRender();

  return (
    <Modal maxWidth='lg' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Cập nhật thông tin đề tài
        </TitleManager>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Formik
            validationSchema={validationTopicSchema}
            onSubmit={(values) => handleSubmit(values)}
            initialValues={{
              name: `${topicFetch?.topic?.name}`,
              quantityGroupMax: `${topicFetch?.topic?.quantityGroupMax}`,
              description: `${topicFetch?.topic?.description}`,
              note: `${topicFetch?.topic?.note}`,
              target: `${topicFetch?.topic?.target}`,
              standardOutput: `${topicFetch?.topic?.standardOutput}`,
              requireInput: `${topicFetch?.topic?.requireInput}`,
            }}
          >
            {({
              handleSubmit,
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name && touched.name ? true : false}
                  helperText={`${errors.name && touched.name ? errors.name : ''}`}
                  required
                  label='Tên đề tài'
                  name='name'
                  placeholder='Tên đề tài'
                />
                <CustomTextField
                  value={`${lecturerStore.me.user.fullName}`}
                  required
                  disabled
                  label='Giảng viên hướng dẫn'
                  placeholder='Tên giảng viên'
                />
                {currentRole.includes('all') && (
                  <CustomTextField
                    placeholder='Số lượng nhóm phải lớn hơn 0 và bé hơn 5'
                    required
                    name='quantityGroupMax'
                    label='Số lượng nhóm đăng ký tối đa'
                    value={values.quantityGroupMax}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.quantityGroupMax && touched.quantityGroupMax ? true : false}
                    helperText={`${
                      errors.quantityGroupMax && touched.quantityGroupMax
                        ? errors.quantityGroupMax
                        : ''
                    }`}
                  />
                )}
                <Box my={4}>
                  <TextEditor
                    label='Mô tả'
                    errors={errors.description && touched.description ? true : false}
                    value={values.description}
                    onChange={(value) => {
                      setFieldValue('description', value);
                    }}
                    id='description'
                    helperText={`${errors.description && touched.description ? errors.description : ''}`}
                    placeholder='Nhập vào mô tả đề tài'
                  />
                </Box>
                <Box my={4}>
                  <TextEditor
                    label='Mục tiêu đề tài'
                    errors={errors.target && touched.target ? true : false}
                    value={values.target}
                    onChange={(value) => {
                      setFieldValue('target', value);
                    }}
                    id='target'
                    helperText={`${errors.target && touched.target ? errors.target : ''}`}
                    placeholder='Nhập vào mục tiêu đề tài'
                  />
                </Box>{' '}
                <Box my={4}>
                  <TextEditor
                    label='Yêu cầu đầu vào'
                    errors={errors.requireInput && touched.requireInput ? true : false}
                    value={values.requireInput}
                    onChange={(value) => {
                      setFieldValue('requireInput', value);
                    }}
                    id='requireInput'
                    helperText={`${errors.requireInput && touched.requireInput ? errors.requireInput : ''}`}
                    placeholder='Nhập vào yêu cầu đầu vào'
                  />
                </Box>
                <Box my={4}>
                  <TextEditor
                    label='Chuẩn đầu ra'
                    errors={errors.standardOutput && touched.standardOutput ? true : false}
                    value={values.standardOutput}
                    onChange={(value) => {
                      setFieldValue('standardOutput', value);
                    }}
                    id='standardOutput'
                    helperText={`${errors.standardOutput && touched.standardOutput ? errors.standardOutput : ''}`}
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
        )}
      </Box>
    </Modal>
  );
}

export default EditModal;
