import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { useNotificationStudent } from '@/hooks/api/useQueryNotificationStudent';
import { Icon } from '@iconify/react';
import { Autocomplete, Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { Formik } from 'formik';
import { DROP_ENUM_QUANTITY_NOTI, validateSchemaNotify } from '../../context';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import useGroupSupport from '@/hooks/api/useQueryGroupSupport';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';

const convertToDropValue = (data: any[]) => {
  if (!data) {
    return [];
  } else {
    let newArray = [];
    newArray = data.map((group) => group.members).flat();

    return newArray.map((v: any) => ({
      label: v.fullName + ' - ' + v.username,
      id: v.id,
    }));
  }
};
function CreateStudentNotifyForm() {
  const { lecturerStore } = useAuth();
  const { handleGetSearchStudentBasic } = useStudent();
  const { handleGetGroupStudentByLecturerByTerm } = useGroupStudent();
  const {
    data: fetchStudents,
    isLoading: loadingStudents,
    isFetching: fetchingStudents,
  } = handleGetGroupStudentByLecturerByTerm(lecturerStore?.me?.user?.id);
  //[Student Handler]
  const { onCreateAllNotificationStudentTerms, onCreateNotificationOfStudentIds } =
    useNotificationStudent();

  const { mutate: createManyStudents, isSuccess: successManyStudent } =
    onCreateAllNotificationStudentTerms();

  const { mutate: createFewStudent, isSuccess: successFewStudent } =
    onCreateNotificationOfStudentIds();

  //[Hooks]
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<{ label: string; id: string }>({
    label: '',
    id: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const [listStudent, setListStudent] = useState([]);

  //[On submit]
  const handleSubmit = (values: any, { resetForm }) => {
    setIsSubmit(true);
    let dataSend = {
      title: values.title,
      content: values.content,
    };
    if (values.typeQuantitySended === 'many') {
      let data = {
        ...dataSend,
        studentIds: convertToDropValue(fetchStudents.groupStudents).map((l) => l.id),
      };
      createFewStudent(data);
    } else if (values.typeQuantitySended === 'few') {
      if (listStudent.length === 0) {
        enqueueSnackbar('Chưa có thông tin sinh viên nhận thông báo.', { variant: 'error' });
        return;
      }
      let data = { ...dataSend, studentIds: listStudent.map((l) => l.id) };
      createFewStudent(data);
    }
    resetForm();
    setIsSubmit(false);
  };

  //[Validate isExist student in list]
  useEffect(() => {
    if (currentStudent?.id) {
      if (listStudent.filter((l) => l.id === currentStudent?.id).length === 0) {
        setListStudent((pre) => [...pre, currentStudent]);
      } else
        enqueueSnackbar({
          message: 'sinh viên ' + currentStudent.label + ' đã có trong danh sách',
          variant: 'error',
        });
    }
  }, [currentStudent]);
  //[Handle remove]
  const onRemoveRecipient = (id: string) => {
    setListStudent((pre) => pre.filter((item) => item.id !== id));
  };
  //[Reset on success]
  useEffect(() => {
    if (successManyStudent || successFewStudent) {
      setCurrentStudent({
        label: '',
        id: '',
      });
      setListStudent([]);
    }
  }, [successManyStudent, successFewStudent]);

  return (
    <Box>
      <Formik
        onSubmit={(values, _) => handleSubmit(values, _)}
        validationSchema={validateSchemaNotify}
        initialValues={{
          name: `${lecturerStore.me.user.fullName}`,
          typeQuantitySended: 'many',
          typeRoleSended: 'students',
          title: '',
          content: '',
          role: `${checkRoleLecturer(lecturerStore.currentRoleRender)}`,
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, values, setFieldValue, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            {/* Detail user */}
            <Box sx={{ mb: 20 }}>
              <Box sx={{ display: 'flex', gap: 10, px: 4, py: 4 }}>
                <Paper sx={{ width: 'calc(60% - 10px)', gap: 4 }}>
                  {/* Title */}
                  <Box mt={4} px={4} display={'flex'} justifyContent={'space-between'}>
                    <TitleManager variant='h5' color={'primary.dark'} mb={6}>
                      Thông tin người nhận
                    </TitleManager>
                    <Box display={'flex'} alignItems={'center'}>
                      <Typography variant='body1' mr={4} color='initial'>
                        Gửi đến
                      </Typography>
                      <DropDown
                        placeholder=''
                        value={values.typeQuantitySended}
                        onChange={(e: any) => {
                          setFieldValue('typeQuantitySended', e.target.value);
                        }}
                        options={DROP_ENUM_QUANTITY_NOTI}
                      />
                    </Box>
                  </Box>
                  <Box mt={4} sx={{ display: 'flex', px: 4, flex: 1, gap: 4 }}>
                    {values.typeQuantitySended !== 'many' && (
                      <Box sx={{ display: 'flex', flex: 1, gap: 4 }}>
                        <Box flex={1}>
                          <Autocomplete
                            disablePortal
                            id='student-terms-list'
                            options={convertToDropValue(fetchStudents?.groupStudents)}
                            onChange={(_, newValue: any) => {
                              setCurrentStudent(newValue);
                            }}
                            renderInput={(params) => (
                              <>
                                <CustomTextField
                                  {...params}
                                  placeholder='Nhập vào tên sinh viên'
                                  // label='DANH SÁCH SV KHOA CÔNG NGHỆ THÔNG TIN'
                                />
                              </>
                            )}
                          />
                        </Box>{' '}
                      </Box>
                    )}
                  </Box>
                  {/* Section detail */}
                  <>
                    {values.typeQuantitySended === 'many' ? (
                      <Box
                        justifyContent={'center'}
                        py={10}
                        px={4}
                        alignItems={'center'}
                        display={'flex'}
                        height={450}
                        bgcolor={'#F2F9F6'}
                      >
                        <Box>
                          <img
                            width={150}
                            src='/images/group_student_3.webp'
                            alt='no-graduation-student-iuh'
                          />
                          <Typography variant='body1' color='grey.600'>
                            Gửi đến tất cả sinh viên
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <>
                        {loadingStudents ? (
                          <LinearProgress />
                        ) : (
                          <>
                            {listStudent.length < 1 ? (
                              <Box
                                justifyContent={'center'}
                                py={10}
                                px={4}
                                alignItems={'center'}
                                display={'flex'}
                                height={400}
                                border={isSubmit ? '1px solid #E62F2F' : '1px solid white'}
                                borderRadius={1}
                              >
                                <Box>
                                  <img
                                    width={200}
                                    src='/images/nodata.webp'
                                    alt='no-graduation-student-iuh'
                                  />
                                  <Typography
                                    variant='body1'
                                    color={isSubmit ? 'error.dark' : 'grey.600'}
                                  >
                                    Bạn chưa chọn sinh viên nào
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <>
                                {/* Have value drop */}
                                <Box px={4}>
                                  <Typography variant='body1' mt={1} mb={4} color='primary.dark'>
                                    Đã chọn: {listStudent.length} sinh viên
                                  </Typography>
                                  {listStudent?.map((student) => (
                                    <Box
                                      bgcolor='grey.50'
                                      mb={4}
                                      alignItems={'center'}
                                      px={4}
                                      justifyContent={'space-between'}
                                      display={'flex'}
                                    >
                                      <Typography
                                        variant='body1'
                                        fontWeight={'500'}
                                        color='grey.700'
                                      >
                                        {student?.label}
                                      </Typography>
                                      <Button
                                        onClick={() => onRemoveRecipient(student.id)}
                                        color='error'
                                      >
                                        Xóa
                                      </Button>
                                    </Box>
                                  ))}
                                </Box>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}{' '}
                  </>
                </Paper>

                {/* Info send */}
                <Paper sx={{ width: '60%', px: 4, py: 4 }}>
                  <Box display={'flex'} mb={4} gap={4}>
                    <Box display={'flex'} gap={3} width={400}>
                      <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                        Tên người gửi:
                      </Typography>
                      <Typography variant='h6' color='primary.dark'>
                        {values.name}
                      </Typography>
                    </Box>
                    <Box display={'flex'} gap={3} width={400}>
                      <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                        Vai trò Người gửi:
                      </Typography>
                      <Typography variant='h6' color='primary.dark'>
                        {values.role}
                      </Typography>
                    </Box>
                  </Box>
                  <CustomTextField
                    name='title'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.title && touched.title ? true : false}
                    helperText={errors.title && touched.title ? errors.title : ''}
                    label='Tiêu đề '
                    placeholder='Nhập tiêu đề ........'
                    id='title'
                    value={values.title}
                  />
                  <TextEditor
                    label='Nội dung '
                    errors={errors.content && touched.content ? true : false}
                    placeholder='Nhập vào nội dung .....................'
                    value={values.content}
                    height={270}
                    onChange={(value) => {
                      setFieldValue('content', value);
                    }}
                    id='content'
                    helperText={errors.content && touched.content ? errors.content : ''}
                  />
                  <Box mt={30} justifyContent={'end'} gap={4} display={'flex'}>
                    <Button variant='contained' color='success' type='submit'>
                      <Icon icon='tabler:send' />
                      Gửi
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default CreateStudentNotifyForm;
