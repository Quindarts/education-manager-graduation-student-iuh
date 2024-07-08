import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';

const DROP_ENUM_ROLE_NOTI = [
  {
    _id: 'students',
    name: 'Gửi đến Sinh viên',
  },
  {
    _id: 'admin',
    name: 'Gửi đến Quản trị viên',
  },
  {
    _id: 'lecturers',
    name: 'Gửi đến Giảng viên',
  },
  {
    _id: 'head_lecturers',
    name: 'Gửi đến Chủ nhiệm ngành',
  },
  {
    _id: 'group_students',
    name: 'Gửi đến Nhóm sinh viên',
  },
  {
    _id: 'group_lecturers',
    name: 'Gửi đến Nhóm giảng viên',
  },
];

const DROP_ENUM_QUANTITY_NOTI = [
  {
    _id: 'one',
    name: 'Tất cả',
  },
  {
    _id: 'many',
    name: 'Một vài',
  },
  {
    _id: 'few',
    name: 'Duy nhất',
  },
];

function AddNotificationModal(props: any) {
  const { open, onClose, termId, type } = props;
  const [typeRoleSended, setTypeRoleSended] = useState(DROP_ENUM_ROLE_NOTI[0]?._id);
  const [typeQuantitySended, setTypeQuantitySended] = useState(DROP_ENUM_QUANTITY_NOTI[0]?._id);
  const { lecturerStore } = useAuth();
  const handleSubmit = (values: any) => {};
  // useEffect(() => {
  //   onClose();
  // }, []);
  return (
    <Modal maxWidth={'lg'} open={open} onClose={onClose}>
      <Box px={6} py={6}>
        <TitleManager icon='material-symbols-light:notification-add-sharp' my={6}>Tạo thông báo mới</TitleManager>

        <Formik
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            type: type,
            termId: termId,
            name: ``,
            scoreMax: ``,
            description: ``,
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values, setFieldValue, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Box display={'flex'} gap={10} p={10}>
                <CustomTextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  disabled
                  label='Vai trò'
                  placeholder='Vai trò Người gửi '
                  value={checkRoleLecturer(lecturerStore.currentRoleRender)}
                />
                <Box width={'100%'}>
                  <CustomTextField
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.name ? true : false}
                    disabled
                    label='Tên người gửi'
                    placeholder='Tên người gửi '
                    value={lecturerStore.me.fullName}
                  />
                </Box>
              </Box>
              <Box bgcolor={'grey.50'} px={10} py={10}>
                <TitleManager variant='body1' icon='ph:user-list' mb={6}>
                  Người nhận
                </TitleManager>
                <Box mb={6}>
                  <Box display={'flex'} gap={10}>
                    <DropDown
                      placeholder=''
                      label='Số lượng người nhận'
                      value={typeQuantitySended}
                      onChange={(e: any) => {
                        setTypeQuantitySended(e.target.value);
                      }}
                      options={DROP_ENUM_QUANTITY_NOTI}
                    />
                    <Box width={'100%'}>
                      <DropDown
                        placeholder=''
                        label='Gửi Thông báo tới'
                        value={typeRoleSended}
                        onChange={(e: any) => {
                          setTypeRoleSended(e.target.value);
                        }}
                        options={DROP_ENUM_ROLE_NOTI}
                      />
                    </Box>
                  </Box>
                </Box>
                <CustomTextField
                  name='name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  label='Tên thông báo'
                  placeholder='Tên thông báo '
                  value={values.name}
                />
                <TextEditor
                  label='Nội dung thông báo'
                  errors={errors.description ? true : false}
                  placeholder='Nhập vào nội dung thông báo'
                  value={values.description}
                  onChange={(value) => {
                    setFieldValue('description', value);
                  }}
                  id='description'
                  helperText={errors.description}
                />
              </Box>

              <Box mt={4} justifyContent={'end'} gap={4} display={'flex'}>
                <Button variant='contained' color='primary' onClick={onClose}>
                  <Icon icon='mdi:close-outline' />
                  Hủy
                </Button>
                <Button variant='contained' color='success' type='submit'>
                  <Icon icon='tabler:send' />
                  Gửi thông báo
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddNotificationModal;
