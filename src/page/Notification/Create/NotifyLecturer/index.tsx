import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { useNotificationLecturer } from '@/hooks/api/useQueryNotificationLecturer';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import { Autocomplete, Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { Formik } from 'formik';
import { DROP_ENUM_QUANTITY_NOTI, validateSchemaNotify } from '../../context';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

const convertToDropValue = (data: any[]) => {
  if (!data) {
    return [];
  } else {
    let newArray = [];
    newArray = data;
    return newArray.map((v: any) => ({
      label: v?.lecturer?.fullName + ' - ' + v?.lecturer?.username,
      id: v?.lecturer?.id,
    }));
  }
};

function CreateLecturerNotifyForm() {
  const { lecturerStore } = useAuth();

  //[Lecturer Handler]
  const { handleGetListLecturerTerms } = useLecturerTerm();
  const { data, isLoading } = handleGetListLecturerTerms();

  const { onCreateAllNotificationLecturerTerms, onCreateNotificationOfLecturerIds } =
    useNotificationLecturer();

  const { mutate: createManyLecturers, isSuccess: successManyLecturer } =
    onCreateAllNotificationLecturerTerms();

  const { mutate: createFewLecturer, isSuccess: successFewLecturer } =
    onCreateNotificationOfLecturerIds();

  //[Hooks]
  const [currentLecturer, setCurrentLecturer] = useState<{ label: string; id: string }>({
    label: '',
    id: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const [listLecturer, setListLecturer] = useState([]);
  //[On submit]

  const handleSubmit = (values: any, { resetForm }) => {
    let dataSend = {
      title: values.title,
      content: values.content,
    };
    if (values.typeQuantitySended === 'many') {
      createManyLecturers(dataSend);
    } else if (values.typeQuantitySended === 'few') {
      let data = { ...dataSend, lecturerIds: listLecturer.map((l) => l.id) };
      createFewLecturer(data);
    }
    resetForm();
  };
  //[Validate isExist lecturer in list]
  useEffect(() => {
    if (currentLecturer?.id) {
      if (listLecturer.filter((l) => l.id === currentLecturer?.id).length === 0) {
        setListLecturer((pre) => [...pre, currentLecturer]);
      } else
        enqueueSnackbar({
          message: 'Giảng viên ' + currentLecturer.label + ' đã có trong danh sách',
          variant: 'error',
        });
    }
  }, [currentLecturer]);

  //[Handle remove]
  const onRemoveRecipient = (id: string) => {
    setListLecturer((pre) => pre.filter((item) => item.id !== id));
  };
  //[Reset on success]
  useEffect(() => {
    if (successFewLecturer || successManyLecturer) {
      setCurrentLecturer({
        label: '',
        id: '',
      });
      setListLecturer([]);
    }
  }, [successFewLecturer, successManyLecturer]);

  return (
    <Box>
      <Formik
        onSubmit={(values, _) => handleSubmit(values, _)}
        validationSchema={validateSchemaNotify}
        initialValues={{
          name: `${lecturerStore.me.user.fullName}`,
          typeQuantitySended: 'many',
          typeRoleSended: 'Lecturers',
          title: '',
          content: '',
          role: `${checkRoleLecturer(lecturerStore.currentRoleRender)}`,
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          touched,
          isSubmitting,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Detail user */}
            <Box sx={{ mb: 20 }}>
              <Box sx={{ display: 'flex', gap: 10, px: 4, py: 4 }}>
                <Paper sx={{ width: 'calc(60% - 10px)', gap: 4, py: 4 }}>
                  <Box px={4} display={'flex'} justifyContent={'space-between'}>
                    <TitleManager mt={4} variant='h5' color={'primary.dark'} mb={6}>
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
                  {values.typeQuantitySended !== 'many' && (
                    <Box mt={4} sx={{ display: 'flex', px: 4, flex: 1, gap: 4 }}>
                      <Box flex={1}>
                        <Autocomplete
                          disablePortal
                          id='lecturer-terms-list'
                          options={convertToDropValue(data?.lecturerTerms)}
                          onChange={(_, newValue: any) => {
                            setCurrentLecturer(newValue);
                          }}
                          renderInput={(params) => (
                            <>
                              <CustomTextField
                                {...params}
                                placeholder='Nhập vào tên giảng viên'
                                // label='DANH SÁCH GV KHOA CÔNG NGHỆ THÔNG TIN'
                              />
                            </>
                          )}
                        />
                      </Box>{' '}
                    </Box>
                  )}
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
                            alt='no-graduation-Lecturer-iuh'
                          />
                          <Typography variant='body1' color='grey.600'>
                            Gửi đến tất cả giảng viên
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <>
                        {isLoading ? (
                          <LinearProgress />
                        ) : (
                          <>
                            {listLecturer.length < 1 ? (
                              <Box
                                justifyContent={'center'}
                                py={10}
                                px={4}
                                alignItems={'center'}
                                display={'flex'}
                                height={400}
                                border={
                                  listLecturer.length === 0 && isSubmitting
                                    ? '1px solid #E62F2F'
                                    : '1px solid white'
                                }
                                borderRadius={1}
                              >
                                <Box>
                                  <img
                                    width={200}
                                    src='/images/nodata.webp'
                                    alt='no-graduation-Lecturer-iuh'
                                  />
                                  <Typography
                                    variant='body1'
                                    color={
                                      listLecturer.length === 0 && isSubmitting
                                        ? 'error.dark'
                                        : 'grey.600'
                                    }
                                  >
                                    Bạn chưa chọn giảng viên nào
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <>
                                {/* Have value drop */}
                                <Box px={4}>
                                  <Typography variant='body1' mt={1} mb={4} color='primary.dark'>
                                    Đã chọn: {listLecturer.length} giảng viên
                                  </Typography>
                                  {listLecturer?.map((lecturer) => (
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
                                        {lecturer?.label}
                                      </Typography>
                                      <Button
                                        onClick={() => onRemoveRecipient(lecturer.id)}
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
                <Paper sx={{ width: '60%', px: 4, py: 10 }}>
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

export default CreateLecturerNotifyForm;
