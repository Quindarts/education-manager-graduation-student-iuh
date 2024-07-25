import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { useNotification } from '@/hooks/api/useQueryNotification';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';

const DROP_ENUM_ROLE_NOTI = [
  {
    _id: 'students',
    name: 'Gửi đến Sinh viên',
  },
  // {
  //   _id: 'admin',
  //   name: 'Gửi đến Quản trị viên',
  // },
  {
    _id: 'lecturers',
    name: 'Gửi đến Giảng viên',
  },
  // {
  //   _id: 'head_lecturers',
  //   name: 'Gửi đến Chủ nhiệm ngành',
  // },
  // {
  //   _id: 'group_students',
  //   name: 'Gửi đến Nhóm sinh viên',
  // },
  // {
  //   _id: 'group_lecturers',
  //   name: 'Gửi đến Nhóm giảng viên',
  // },
];

const DROP_ENUM_QUANTITY_NOTI = [
  {
    _id: 'many',
    name: 'Tất cả',
  },
  // {
  //   _id: 'few',
  //   name: 'Một vài',
  // },
  {
    _id: 'one',
    name: 'Duy nhất',
  },
];

function getNameById(id: string) {
  const item = DROP_ENUM_ROLE_NOTI.find((role) => role._id === id);
  return item ? item.name : null;
}

const handleMessageSending = (
  role: string,
  roleIsGived: string,
  messageName: string,
  messageContent: string,
) => {
  const convertToMess =
    '<h5>' +
    role +
    ' ' +
    getNameById(roleIsGived) +
    ' </h5> ' +
    '<br/>' +
    ' <h3> Tiêu đề: ' + 
    messageName +
    ' </h3> ' +
    '<br/>' +
    ' <h4> Nội dung cụ thể: </h4>' +
    messageContent;
  return convertToMess;
};
function AddNotificationModal(props: any) {
  const { open, onClose, termId, type } = props;
  const { lecturerStore } = useAuth();
  const { onCreateAllNotificationStudentTerms, onCreateAllNotificationLecturerTerms } =
    useNotification();
  const { mutate: createManyStudents, isSuccess: successStudents } =
    onCreateAllNotificationStudentTerms();
  const { mutate: createManyLecturers, isSuccess: successLecturers } =
    onCreateAllNotificationLecturerTerms();

  const handleSubmit = (values: any) => {
    const message = handleMessageSending(
      values.role,
      values.typeRoleSended,
      values.messageName,
      values.messageContent,
    );
    if (values.typeQuantitySended === 'many' && values.typeRoleSended === 'students') {
      createManyStudents(message);
    } else if (values.typeQuantitySended === 'many' && values.typeRoleSended === 'lecturers') {
      createManyLecturers(message);
    }
  };
  useEffect(() => {
    if (successLecturers || successStudents) {
      onClose();
    }
  }, [successLecturers, successStudents]);

  return (
    <Modal maxWidth='lg' open={open} onClose={onClose}>
      <Box px={6} py={6}>
        <TitleManager
          textTransform={'uppercase'}
          icon='material-symbols:circle-notifications-rounded'
          my={6}
        >
          Tạo thông báo mới
        </TitleManager>

        <Formik
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            type: type,
            termId: termId,
            name: `${lecturerStore.me.user.fullName}`,
            typeQuantitySended: 'many',
            typeRoleSended: 'students',
            messageName: '',
            messageContent: '',
            role: `${checkRoleLecturer(lecturerStore.currentRoleRender)}`,
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values, setFieldValue, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Box display={'flex'} gap={10} px={10}>
                <CustomTextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  disabled
                  label='Vai trò'
                  name='role'
                  placeholder='Vai trò Người gửi '
                  value={values.role}
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
                    name='name'
                    value={values.name}
                  />
                </Box>
              </Box>
              <Box bgcolor={'grey.50'} px={10} pb={4}>
                <TitleManager
                  variant='body1'
                  textTransform={'uppercase'}
                  icon='ph:user-list'
                  mb={6}
                >
                  Người nhận
                </TitleManager>
                <Box mb={6}>
                  <Box display={'flex'} gap={10}>
                    <DropDown
                      placeholder=''
                      label='Số lượng người nhận'
                      value={values.typeQuantitySended}
                      onChange={(e: any) => {
                        setFieldValue('typeQuantitySended', e.target.value);
                      }}
                      options={DROP_ENUM_QUANTITY_NOTI}
                    />
                    <Box width={'100%'}>
                      <DropDown
                        placeholder=''
                        label='Gửi Thông báo tới'
                        value={values.typeRoleSended}
                        onChange={(e: any) => {
                          setFieldValue('typeRoleSended', e.target.value);
                        }}
                        options={DROP_ENUM_ROLE_NOTI}
                      />
                    </Box>
                  </Box>
                </Box>
                <CustomTextField
                  name='messageName'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.messageName ? true : false}
                  helperText={errors.messageName}
                  label='Tiêu đề thông báo'
                  placeholder='Tên thông báo '
                  id='messageName'
                  value={values.messageName}
                />
                <TextEditor
                  label='Nội dung thông báo'
                  errors={errors.messageContent ? true : false}
                  placeholder='Nhập vào nội dung thông báo'
                  value={values.messageContent}
                  onChange={(value) => {
                    setFieldValue('messageContent', value);
                  }}
                  id='messageContent'
                  helperText={errors.messageContent}
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
