import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import CardRole from './Card';
import { EnumRole } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import { Navigate } from 'react-router-dom';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useDispatch } from 'react-redux';
import { setAllMajor } from '@/store/slice/major.slice';
import { setAllTerm } from '@/store/slice/term.slice';

const CARD_ROLE_TYPE = [
  {
    icon: 'fluent-mdl2:party-leader',
    name: 'Chủ nhiệm ngành',
    role: EnumRole.HEAD_LECTURER,
    // numRole: 2,
    desc: 'Quyền Chủ nhiệm ngành lãnh đạo, quản lý hoạt động giảng dạy và đồ án tốt nghiệp, đảm bảo chất lượng và phát triển chuyên môn.',
  },
  {
    icon: 'ri:admin-line',
    name: 'Quản trị viên',
    role: EnumRole.ADMIN,
    // numRole: 2,
    desc: 'Quyền quản trị viên quản lý hoạt động giảng dạy và đồ án tốt nghiệp, đảm bảo chất lượng và phát triển chuyên môn.',
  },
  {
    icon: 'ph:chalkboard-teacher',
    name: 'Giảng viên',
    // numRole: 1,

    role: EnumRole.LECTURER,

    desc: 'Trong hệ thống quản lý khóa luận, giảng viên hướng dẫn sinh viên, theo dõi tiến độ, và đánh giá chất lượng công trình.',
  },
  {
    icon: 'grommet-icons:user-admin',
    name: 'Chủ quản môn học',
    role: EnumRole.HEAD_COURSE,
    // numRole: 3,
    desc: 'Trong hệ thống quản lý khóa luận, Chủ quản môn học quản lý người dùng, thiết lập hệ thống, và duy trì hoạt động.',
  },
];

function RolePage() {
  const { lecturerStore, handleGetMe } = useAuth();
  const { isLoading, data, isFetching, isSuccess } = handleGetMe();
  const { handleGetCurrentTerm } = useTerm();
  const dispatch = useDispatch();

  handleGetMe();
  if (isSuccess) handleGetCurrentTerm(data.lecturer.majorId);

  const { handleGetAllMajor } = useMajor();
  const { handleGetAllTermByMajor } = useTerm();
  const { data: dataMajorFetch, isSuccess: successMajor } = handleGetAllMajor();

  if (successMajor) dispatch(setAllMajor(dataMajorFetch.majors));

  const { data: dataTermFecth, isSuccess: successTerm } = handleGetAllTermByMajor(
    data?.lecturer.majorId,
  );

  if (successTerm) dispatch(setAllTerm(dataTermFecth.terms));

  const accessToken: string = getValueFromLocalStorage('accessToken') || '';

  return (
    <>
      {!accessToken ? (
        <Navigate to='/auth/login' />
      ) : (
        <Box
          position={'fixed'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          bgcolor={'rgba(0,0,0,0.5)'}
          zIndex={9999}
          top={0}
          bottom={0}
          left={0}
          right={0}
        >
          <Paper>
            <Typography m={5} variant='h5' fontWeight={500} color='primary'>
              Chào mừng trở lại, vui lòng chọn vai trò{' '}
            </Typography>
            <Box
              sx={{
                width: 1000,
                height: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {CARD_ROLE_TYPE.filter((item) => lecturerStore.me.roles.includes(item.role)).map(
                (item, key) => (
                  <CardRole
                    name={item.name}
                    desc={item.desc}
                    role={item.role}
                    icon={item.icon}
                    key={key}
                  />
                ),
              )}
            </Box>
          </Paper>
        </Box>
      )}
      ;
    </>
  );
}
export default RolePage;
