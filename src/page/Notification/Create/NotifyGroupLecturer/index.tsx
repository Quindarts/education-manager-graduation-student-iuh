import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import TextEditor from '@/components/ui/TextEditor';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { Icon } from '@iconify/react';
import { Autocomplete, Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { Formik } from 'formik';
import {
  DROP_ENUM_QUANTITY_NOTI,
  DROP_ENUM_QUANTITY_NOTI_FEW,
  validateSchemaNotify,
} from '../../context';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { useNotificationLecturer } from '@/hooks/api/useQueryNotificationLecturer';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';

const convertToDropValue = (data: any[]) => {
  if (!data) {
    return [];
  } else {
    let newArray = [];
    newArray = data;
    return newArray.map((v: any) => ({
      label: v.name,
      id: v.id,
    }));
  }
};
function CreateGroupLecturerNotifyForm() {
  const { lecturerStore } = useAuth();

  //[GroupLecturer Handler]
  const { onCreateNotificationOfGroupLecturer } = useNotificationLecturer();
  const { handleGetGroupLecturerSearchByName } = useGroupLecturer();

  const { data: fecthGroups, refetch } = handleGetGroupLecturerSearchByName('');
  const { mutate: createFewGroupLecturer, isSuccess: successFewGroupLecturer } =
    onCreateNotificationOfGroupLecturer();

  //[Hooks]
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentGroupLecturer, setCurrentGroupLecturer] = useState<{ label: string; id: string }>({
    label: '',
    id: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const [listGroupLecturer, setListGroupLecturer] = useState([]);

  //[On submit]
  const handleSubmit = (values: any, { resetForm }) => {
    setIsSubmit(true);
    let dataSend = {
      title: values.title,
      content: values.content,
    };
    if (values.typeQuantitySended === 'many') {
      // createManygroupLecturers(dataSend);
    } else if (values.typeQuantitySended === 'few') {
      if (listGroupLecturer.length === 0) {
        enqueueSnackbar('Chưa có thông tin nhóm giảng viên nhận thông báo.', { variant: 'error' });
        return;
      }
      let data = { ...dataSend, groupLecturerIds: listGroupLecturer.map((l) => l.id) };
      createFewGroupLecturer(data);
    }
    resetForm();
    setIsSubmit(false);
  };

  //[Validate isExist GroupLecturer in list]
  useEffect(() => {
    if (currentGroupLecturer?.id) {
      if (listGroupLecturer.filter((l) => l.id === currentGroupLecturer?.id).length === 0) {
        setListGroupLecturer((pre) => [...pre, currentGroupLecturer]);
      } else
        enqueueSnackbar({
          message: 'Nhóm giảng viên ' + currentGroupLecturer.label + ' đã có trong danh sách',
          variant: 'error',
        });
    }
  }, [currentGroupLecturer]);
  //[Handle remove]
  const onRemoveRecipient = (id: string) => {
    setListGroupLecturer((pre) => pre.filter((item) => item.id !== id));
  };
  //[Reset on success]
  useEffect(() => {
    if (successFewGroupLecturer) {
      setCurrentGroupLecturer({
        label: '',
        id: '',
      });
      setListGroupLecturer([]);
    }
  }, [successFewGroupLecturer]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box>
      <Formik
        onSubmit={(values, _) => handleSubmit(values, _)}
        validationSchema={validateSchemaNotify}
        initialValues={{
          name: `${lecturerStore.me.user.fullName}`,
          typeQuantitySended: 'few',
          typeRoleSended: 'groupLecturers',
          title: '',
          content: '',
          role: `${checkRoleLecturer(lecturerStore.currentRoleRender)}`,
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, values, setFieldValue, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            {/* Detail user */}
            <Box sx={{ mb: 20 }}>
              <Box sx={{ display: 'flex', gap: 10, py: 4 }}>
                <Paper sx={{ width: 'calc(60% - 10px)', gap: 4 }}>
                  {/* Title */}
                  <Box mt={4} px={4} display={'flex'} justifyContent={'space-between'}>
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
                        options={DROP_ENUM_QUANTITY_NOTI_FEW}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', px: 4, flex: 1, gap: 4 }}>
                    {values.typeQuantitySended !== 'many' && (
                      <Box mt={4} sx={{ display: 'flex', flex: 1, gap: 4 }}>
                        <Box flex={1}>
                          <Autocomplete
                            disablePortal
                            id='GroupLecturer-terms-list'
                            options={convertToDropValue(fecthGroups?.groupLecturers)}
                            onChange={(_, newValue: any) => {
                              setCurrentGroupLecturer(newValue);
                            }}
                            renderInput={(params) => (
                              <>
                                <CustomTextField
                                  {...params}
                                  placeholder='Nhập vào tên nhóm giảng viên'
                                  // label='DANH SÁCH NHÓM giảng viên'
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
                            alt='no-graduation-GroupLecturer-iuh'
                          />
                          <Typography variant='body1' color='grey.600'>
                            Gửi tất cả Nhóm giảng viên
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <>
                        {false ? (
                          <LinearProgress />
                        ) : (
                          <>
                            {listGroupLecturer.length < 1 ? (
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
                                    alt='no-graduation-GroupLecturer-iuh'
                                  />
                                  <Typography
                                    variant='body1'
                                    color={isSubmit ? 'error.dark' : 'grey.600'}
                                  >
                                    Bạn chưa chọn nhóm giảng viên nào
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <>
                                {/* Have value drop */}
                                <Box px={4}>
                                  <Typography variant='body1' mt={1} mb={4} color='primary.dark'>
                                    Đã chọn: {listGroupLecturer.length} nhóm giảng viên
                                  </Typography>
                                  {listGroupLecturer?.map((GroupLecturer) => (
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
                                        {GroupLecturer?.label}
                                      </Typography>
                                      <Button
                                        onClick={() => onRemoveRecipient(GroupLecturer.id)}
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

export default CreateGroupLecturerNotifyForm;
