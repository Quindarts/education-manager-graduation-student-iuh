import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import useEvaluation from '@/hooks/api/useQueryEvalutaion';
import { getTypeEvaluation } from '@/utils/validations/evaluation.validation';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { validateSchemaReview } from '../Context';

function AddEvaluationModal(props: any) {
  const { open, onClose, termId, type } = props;
  const { onCreateEvaluation } = useEvaluation();
  const { mutate: createEval, isSuccess: successCreate } = onCreateEvaluation(termId, type);

  const handleSubmit = (values: any) => {
    createEval(values);
  };
  useEffect(() => {
    onClose();
  }, [successCreate]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box px={6} py={6}>
        <TitleManager my={6}>Tạo tiêu chí đánh giá</TitleManager>

        <Formik
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validateSchemaReview}
          initialValues={{
            type: type,
            termId: termId,
            name: ``,
            scoreMax: ``,
            description: ``,
            key: ``,
          }}
          // validationSchema={{}}
        >
          {({ handleBlur, handleChange, handleSubmit, touched, values, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <CustomTextField
                name='type'
                label='Loại đánh giá'
                disabled
                value={getTypeEvaluation(values.type)}
              />
              <CustomTextField
                name='key'
                label='CLO ID'
                placeholder='ID của CLO, VD: LO01, LO02, LO10...'
                value={values.key}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <CustomTextField
                name='name'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.name && touched.name ? true : false}
                helperText={errors.name && touched.name ? errors.name : ''}
                label='Tên tiêu chí'
                placeholder='Tên tiêu chí đánh giá'
                value={values.name}
              />
              <CustomTextField
                name='scoreMax'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.scoreMax && touched.scoreMax ? true : false}
                helperText={errors.scoreMax && touched.scoreMax ? errors.scoreMax : ''}
                label='Điểm tối đa'
                type='number'
                placeholder='Điểm tối đa'
                value={values.scoreMax}
              />
              <TextEditor
                label='Mô tả tiêu chí'
                errors={errors.description && touched.description}
                value={values.description}
                onChange={(value) => {
                  setFieldValue('description', value);
                }}
                id='description'
                helperText={errors.description && touched.description ? errors.description : ''}
              />
              <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                <Button variant='contained' color='primary' onClick={onClose}>
                  <Icon icon='mdi:close-outline' />
                  Hủy
                </Button>
                <Button variant='contained' color='success' type='submit'>
                  <Icon icon='material-symbols:save-outline' />
                  Tạo tiêu chí
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddEvaluationModal;
