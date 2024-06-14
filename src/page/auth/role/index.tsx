import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import CardRole from './Card';
import { EnumRole } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import Loading from '@/components/ui/Loading';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import { Navigate } from 'react-router-dom';

const checkCurrentRole = (role: EnumRole, isAdmin: boolean) => {
  var numRole = 0;
  if (isAdmin) {
    return 3;
  }
  switch (role) {
    case EnumRole.HEAD_LECTURER:
      numRole = 2;
      break;
    case EnumRole.LECTURER:
      numRole = 1;
      break;
    case EnumRole.SUB_HEAD_LECTURER:
      numRole = 2;
      break;
    default:
      break;
  }
  return numRole;
};

const CARD_ROLE_TYPE = [
  {
    icon: 'fluent-mdl2:party-leader',
    name: 'Trưởng bộ môn',
    role: EnumRole.HEAD_LECTURER,
    numRole: 2,
    desc: 'Quyền trưởng bộ môn lãnh đạo, quản lý hoạt động giảng dạy và đồ án tốt nghiệp, đảm bảo chất lượng và phát triển chuyên môn.',
  },
  {
    icon: 'ph:chalkboard-teacher',
    name: 'Giảng viên',
    numRole: 1,

    role: EnumRole.LECTURER,

    desc: 'Trong hệ thống quản lý khóa luận, giảng viên hướng dẫn sinh viên, theo dõi tiến độ, và đánh giá chất lượng công trình.',
  },
  {
    icon: 'grommet-icons:user-admin',
    name: 'Quản trị viên',
    role: EnumRole.ADMIN,
    numRole: 3,
    desc: 'Trong hệ thống quản lý khóa luận, quyền admin quản lý người dùng, thiết lập hệ thống, và duy trì hoạt động.',
  },
];

function RolePage() {
  const { lecturerStore, handleGetMe } = useAuth();
  const { isLoading } = handleGetMe();
  handleGetMe();
  const currentRole = checkCurrentRole(lecturerStore.me.role, lecturerStore.me.isAdmin);
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
              {CARD_ROLE_TYPE.map(
                (item, key) =>
                  currentRole >= item.numRole && (
                    <CardRole
                      name={item.name}
                      role={item.role}
                      desc={item.desc}
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
