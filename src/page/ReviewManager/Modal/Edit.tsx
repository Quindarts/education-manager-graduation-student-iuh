import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import useEvaluation from '@/hooks/api/useQueryEvalutaion';
import { getTypeEvaluation } from '@/utils/validations/evaluation.validation';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';

function EditEvaluationModal(props: any) {
  const { open, onClose, evaluationId, termId, type } = props;
  const { handleGetEvaluationById, onUpdateEvaluationById } = useEvaluation();
  const { data, isSuccess, isLoading } = handleGetEvaluationById(evaluationId);
  const { mutate: createEval, isSuccess: successUpdate } = onUpdateEvaluationById(
    termId,
    type,
    evaluationId,
  );

  const handleSubmit = (values: any) => {
    createEval(values);
  };
  useEffect(() => {
    onClose();
  }, [successUpdate]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box px={6} py={6}>
        <TitleManager my={6}>Cập nhật tiêu chí đánh giá</TitleManager>
        {isLoading || !isSuccess ? (
          <SekeletonUI />
        ) : (
          <Formik
            onSubmit={(values) => handleSubmit(values)}
            initialValues={{
              type: `${data.evaluation.type}`,
              name: `${data.evaluation.name}`,
              scoreMax: `${data.evaluation.scoreMax}`,
              description: `${data.evaluation.description}`,
              key: `${data.evaluation.key}`,
            }}
            // validationSchema={{}}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              touched,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  name='type'
                  label='Loại đánh giá'
                  disabled
                  value={getTypeEvaluation(values.type)}
                />
                <CustomTextField
                  name='name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  label='Tên tiêu chí'
                  placeholder='Tên tiêu chí đánh giá'
                  value={values.name}
                />
                <CustomTextField
                  name='key'
                  label='CLO ID'
                  placeholder='ID của CLO, VD: LO1, LO2,...'
                  value={values.key}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <CustomTextField
                  name='scoreMax'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.scoreMax ? true : false}
                  helperText={errors.scoreMax}
                  label='Điểm tối đa'
                  placeholder='Điểm tối đa'
                  value={values.scoreMax}
                />
                <TextEditor
                  label='Mô tả tiêu chí'
                  errors={errors.description ? true : false}
                  value={values.description}
                  onChange={(value) => {
                    setFieldValue('description', value);
                  }}
                  id='description'
                  helperText={errors.description}
                />
                <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={onClose}>
                    <Icon icon='mdi:close-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon icon='material-symbols:save-outline' />
                    Cập nhật tiêu chí
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

export default EditEvaluationModal;
