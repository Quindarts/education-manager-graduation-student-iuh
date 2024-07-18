import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal, { ModalTypeProps } from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { Icon } from '@iconify/react';
import { Box, Button, DialogProps } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

function InfoModal(props: any) {
  const { onClose, open, topicId } = props;
  const { handleTopicById } = useTopic();
  const { data, isLoading } = handleTopicById(topicId);
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Modal maxWidth={'md'} open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h6' textTransform={'uppercase'}>
          Thông tin chi tiết Đề tài
        </TitleManager>
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <CustomTextField
              label='Tên đề tài'
              value={data?.topic?.name}
              placeholder='Tên đề tài'
            />
            <Box display={'flex'} width={'100%'} gap={8}>
              <Box flex={1}>
                <CustomTextField
                  type='number'
                  value={data?.topic?.quantityGroupMax}
                  label='Số lượng nhóm sinh viên tối đa'
                  placeholder='Số lượng đề tài'
                />
              </Box>

              <Box flex={1}>
                <CustomTextField
                  sx={{ flex: 1 }}
                  label='Giảng viên phụ trách'
                  value={data?.topic?.lecturerTerm.lecturer.fullName}
                  placeholder='tên giảng viên'
                />
              </Box>
              <Box flex={1}>
                <CustomTextField
                  label='Trạng thái đề tài'
                  value={data?.topic?.status}
                  placeholder='tên giảng viên'
                />
              </Box>
            </Box>
            <CustomTextField
              label='Mô tả đề tài'
              multiline
              value={data?.topic?.description}
              maxRows={8}
              placeholder='Nhập vào Mô tả đề tài'
            />
            <CustomTextField
              multiline
              value={data?.topic?.note}
              maxRows={8}
              label='Ghi chú đề tài'
              placeholder='Ghi chú đề tài'
            />
            <CustomTextField
              multiline
              value={data?.topic?.target}
              maxRows={8}
              label='Mục tiêu đề tài'
              placeholder='Mục tiêu đề tài'
            />
            <CustomTextField
              multiline
              maxRows={8}
              label='Yêu cầu đầu vào'
              value={data?.topic?.requireInput}
              placeholder='Yêu cầu đầu vào'
            />
            <CustomTextField
              multiline
              maxRows={10}
              label='Chuẩn đầu ra'
              value={data?.topic?.standardOutput}
              placeholder='Chuẩn đầu ra'
            />

            <Box mt={10} justifyContent={'end'} gap={8} display={'flex'}>
              <Button variant='contained' color='primary' onClick={onClose}>
                <Icon icon='mdi:close-outline' />
                Thoát
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
}

export default InfoModal;
