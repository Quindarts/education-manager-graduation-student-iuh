import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumGender, EnumRole } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { validateSchemaLecturer } from '../../context';
import { convertMajorDropDown } from '@/utils/convertDataTable';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';

const GenderLecturer = [
  {
    _id: EnumGender.FEMALE,
    name: 'Nữ',
  },
  {
    _id: EnumGender.MALE,
    name: 'Nam',
  },
];
const RoleLecturerDrop = [
  {
    _id: EnumRole.LECTURER,
    name: 'Giảng viên',
  },
  {
    _id: EnumRole.HEAD_LECTURER,
    name: 'Trưởng bộ môn',
  },
  {
    _id: EnumRole.SUB_HEAD_LECTURER,
    name: 'Phó bộ môn',
  },
];

const DEGREE_DROP_VALUE = [
  { name: 'Thạc sĩ', _id: 'DOCTOR' },
  { name: 'Tiến sĩ', _id: 'MASTER' },
];

function AddLecturerModal(props: any) {
  const { onClose, open } = props;
  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  const { currentTerm } = termStore;

  const { onCreateLecturer } = useLecturer();
  const { mutate: createLecturer, isSuccess } = onCreateLecturer(currentTerm.id, 20, 1);

  const handleSubmitCreateLecturer = (values: any) => {
    var dataSend = {
      username: values.username,
      fullName: values.fullName,
      gender: values.gender,
      email: values.email,
      phone: values.phone,
      degree: values.degree,
      role: 'LECTURER',
      majorId: values.majorId,
      termId: currentTerm.id,
    };
    alert('hi')
    createLecturer(dataSend);
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal maxWidth='xs' open={open} onClose={onClose}>
      <Box py={10} px={10}>
        <TitleManager mb={2} variant='h5' textTransform={'uppercase'}>
          Tạo thông tin Giảng viên
        </TitleManager>

        <Formik
          onSubmit={(values) => {
            handleSubmitCreateLecturer(values);
          }}
          validationSchema={validateSchemaLecturer}
          initialValues={{
            fullName: '',
            username: '',
            email: '',
            phone: '',
            gender: EnumGender.MALE,
            role: '',
            degree: DEGREE_DROP_VALUE[0]?._id,
            majorId: ``,
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box
                mx={'auto'}
                position={'relative'}
                height={80}
                width={80}
                mb={3}
                sx={{ borderRadius: '50%', bgcolor: '#f3f3f9' }}
              >
                <img style={{ borderRadius: '50%' }} alt='' src={'/'} />
                <Box
                  sx={{
                    border: '3px solid white',
                    backgroundColor: 'primary.main',
                    cursor: 'pointer',
                  }}
                  borderRadius={'50%'}
                  height={32}
                  width={32}
                  position={'absolute'}
                  top={0}
                  right={'4px'}
                  color={'white'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <label style={{ cursor: 'pointer' }}>
                    <Icon icon='heroicons:camera-solid' width={16} />
                    <input type='file' style={{ display: 'none' }} onChange={(event) => {}} />
                  </label>
                </Box>
              </Box>
              <CustomTextField
                required
                value={values.username}
                name='username'
                label='Mã giảng viên'
                placeholder='Mã Giảng viên'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username ? true : false}
                helperText={errors.username}
              />
              <Box display={'flex'} gap={10} mt={8}>
                <Box width={'100%'}>
                  <CustomTextField
                    required
                    value={values.fullName}
                    name='fullName'
                    label='Họ và tên'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Họ và tên'
                    error={errors.fullName ? true : false}
                    helperText={errors.fullName}
                  />
                </Box>
                <Box width={200}>
                  <DropDown
                    sx={{ mb: 8 }}
                    value={`${values.gender}`}
                    onChange={(e) => {
                      setFieldValue('gender', e.target.value);
                    }}
                    label='Giới tính'
                    options={GenderLecturer}
                  />
                </Box>
              </Box>
              <CustomTextField
                required
                name='phone'
                value={values.phone}
                label='Số điện thoại'
                placeholder='Nhập vào số điện thoại'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone ? true : false}
                helperText={errors.phone}
              />
              <CustomTextField
                required
                value={values.email}
                name='email'
                label='Email'
                placeholder='Nhập vào email'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email ? true : false}
                helperText={errors.email}
              />
              <Box mt={8} width={'full'}>
                <DropDown
                  label='Chuyên ngành'
                  value={values.majorId}
                  onChange={(e) => {
                    setFieldValue('majorId', e.target.value);
                  }}
                  options={convertMajorDropDown(majorStore.allMajor)}
                />
              </Box>{' '}
              <Box mt={8} width={'full'}>
                <DropDown
                  value={`${EnumRole.LECTURER}`}
                  disabled
                  label='Vai trò'
                  options={RoleLecturerDrop}
                />
              </Box>
              <Box mt={8} width={'full'}>
                <DropDown
                  label='Trình độ'
                  value={values.degree}
                  onChange={(e) => {
                    setFieldValue('degree', e.target.value);
                  }}
                  options={DEGREE_DROP_VALUE}
                />
              </Box>{' '}
              <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                <Button variant='contained' color='primary' onClick={onClose}>
                  <Icon icon='mdi:close-outline' />
                  Hủy
                </Button>
                <Button variant='contained' color='success' type='submit'>
                  <Icon icon='material-symbols:save-outline' />
                  Tạo giảng viên
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddLecturerModal;
