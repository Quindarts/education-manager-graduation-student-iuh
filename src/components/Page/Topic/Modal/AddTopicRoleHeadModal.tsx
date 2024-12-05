import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { Icon } from '@iconify/react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { validationTopicSchema } from '../../../../page/Topic/Context';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import DropDown from '@/components/ui/Dropdown';
const convertLecturer = (lterms: any) => {
  let updateLecturers: any[] = [];
  if (lterms == null) {
    return [];
  } else
    lterms?.map((lect: any) => {
      updateLecturers.push({
        _id: lect?.lecturerId,
        name: lect?.username + ' - ' + lect?.fullName,
      });
    });
  return updateLecturers;
};
function AddTopicRoleHeadModal(props: any) {
  const { onClose, open } = props;
  const {} = useTopic();
  const { onCreateTopicByToken, handleUiRender } = useTopic();
  const { mutate: createTopic, isSuccess: successCreate } = onCreateTopicByToken();
  const { handleGetListLecturerTerms } = useLecturerTerm();
  const { data, isLoading, isFetching } = handleGetListLecturerTerms('default');

  const [lecturer, setlecturer] = useState<string>('');

  const handleSubmit = (values: any) => {
    createTopic({ ...values, lecturerId: lecturer });
  };
  useEffect(() => {
    onClose();
  }, [successCreate]);

  const currentRole = handleUiRender();

  return (
    <Modal maxWidth='md' open={open} onClose={onClose}>
      <Box pb={5} px={10}>
        <TitleManager mb={10} variant='h6' icon='mdi:folder-add' textTransform={'uppercase'}>
          Tạo đề tài mới
        </TitleManager>
        <Formik
          validationSchema={validationTopicSchema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: '',
            keywords: '',
            quantityGroupMax: 5,
            description: 'Cập nhật mô tả đề tài',
            expectedResult: 'Cập nhật kết quả dự kiến',
            target: '',
            standardOutput: 'Cập nhật yêu cầu đầu ra',
            requireInput: 'Cập nhật yêu cầu đầu vào',
          }}
        >
          {({ handleSubmit, values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box></Box>
              <Box my={10}>
                <Box sx={{ width: '100%' }}>
                  <DropDown
                    required
                    label='Chọn giảng viên hướng dẫn'
                    placeholder='Danh sách giảng viên hướng dẫn '
                    onChange={(e: any) => {
                      setlecturer(e.target.value);
                    }}
                    options={convertLecturer(data?.lecturerTerms)}
                  />
                </Box>
              </Box>
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
                  helperText={
                    errors.quantityGroupMax && touched.quantityGroupMax
                      ? errors.quantityGroupMax
                      : ''
                  }
                />
              )}
              <CustomTextField
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name && touched.name ? errors.name : ''}
                required
                label='Tên đề tài'
                name='name'
                placeholder='Tên đề tài'
              />
              <CustomTextField
                value={values.keywords}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name ? true : false}
                helperText={`${errors.name && touched.name ? errors.name : ''}`}
                required
                label='Từ khóa'
                name='keywords'
                placeholder='Ví dụ: web, app, AI, security,...'
              />
              <Typography variant='body1' color='warning.dark'>
                Lưu ý*: các từ khóa ngăn cách nhau bởi dấu ",". Khuyến khích sử dụng tiếng anh và
                dùng từ viết tắt{' '}
              </Typography>
              <Typography variant='body1' mb={6} color='warning.dark'>
                Đề tài chỉ nên có khoảng 1 đến 5 từ khóa
              </Typography>
              <Box my={4}>
                <TextEditor
                  label='Mục tiêu đề tài'
                  errors={errors.target && touched.target ? true : false}
                  value={values.target}
                  onChange={(value) => {
                    setFieldValue('target', value);
                  }}
                  id='target'
                  helperText={errors.target && touched.target ? errors.target : ''}
                  placeholder='Nhập vào mục tiêu đề tài'
                />
              </Box>{' '}
              <Box my={4}>
                <TextEditor
                  onChange={(value) => {
                    setFieldValue('expectedResult', value);
                  }}
                  id='expectedResult'
                  value={values.expectedResult}
                  label='Dự kiến sản phẩm nghiên cứu của đề tài và khả năng ứng dụng'
                  placeholder='Dự kiến sản phẩm nghiên cứu của Đề tài và khả năng ứng dụng'
                  errors={errors.expectedResult && touched.expectedResult ? true : false}
                  helperText={
                    errors.expectedResult && touched.expectedResult ? errors.expectedResult : ''
                  }
                />
              </Box>
              <Box my={4}>
                <TextEditor
                  label='Mô tả'
                  errors={errors.description && touched.description ? true : false}
                  value={values.description}
                  onChange={(value) => {
                    setFieldValue('description', value);
                  }}
                  id='description'
                  helperText={errors.description && touched.description ? errors.description : ''}
                  placeholder='Nhập vào mô tả đề tài'
                />
              </Box>
              <Box my={4}>
                <TextEditor
                  label='Yêu cầu đầu vào'
                  errors={errors.requireInput && touched.requireInput ? true : false}
                  value={values.requireInput}
                  onChange={(value) => {
                    setFieldValue('requireInput', value);
                  }}
                  id='requireInput'
                  helperText={
                    errors.requireInput && touched.requireInput ? errors.requireInput : ''
                  }
                  placeholder='Nhập vào yêu cầu đầu vào'
                />
              </Box>
              <Box my={4}>
                <TextEditor
                  label='Yêu cầu đầu ra'
                  errors={errors.standardOutput && touched.standardOutput ? true : false}
                  value={values.standardOutput}
                  onChange={(value) => {
                    setFieldValue('standardOutput', value);
                  }}
                  id='standardOutput'
                  helperText={
                    errors.standardOutput && touched.standardOutput ? errors.standardOutput : ''
                  }
                  placeholder='Nhập vào yêu cầu đầu ra'
                />
              </Box>
              <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                <Button variant='contained' color='primary' onClick={onClose}>
                  <Icon icon='mdi:close-outline' />
                  Hủy
                </Button>
                <Button variant='contained' color='success' type='submit'>
                  <Icon width={20} icon='material-symbols:save-outline' />
                  Lưu
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddTopicRoleHeadModal;
