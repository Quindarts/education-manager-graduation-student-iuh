import { Box} from '@mui/material';
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

const CARD_ROLE_TYPE = [
  {
    icon: 'icomoon-free:user-tie',
    name: 'Chủ nhiệm ngành',
    role: EnumRole.HEAD_LECTURER,
    desc: 'Quyền Chủ nhiệm ngành lãnh đạo, quản lý hoạt động giảng dạy và đồ án tốt nghiệp, đảm bảo chất lượng và phát triển chuyên môn.',
  },
  {
    icon: 'eos-icons:admin-outlined',
    name: 'Quản trị viên',
    role: EnumRole.ADMIN,
    desc: 'Quyền quản trị viên quản lý hoạt động giảng dạy và đồ án tốt nghiệp, đảm bảo chất lượng và phát triển chuyên môn.',
  },
  {
    icon: 'fa6-solid:user-graduate',
    name: 'Giảng viên',
    role: EnumRole.LECTURER,
    desc: 'Trong hệ thống quản lý khóa luận, giảng viên hướng dẫn sinh viên, theo dõi tiến độ, và đánh giá chất lượng công trình.',
  },
  {
    icon: 'vaadin:calendar-user',
    name: 'Chủ quản môn học',
    role: EnumRole.HEAD_COURSE,
    desc: 'Trong hệ thống quản lý khóa luận, Chủ quản môn học quản lý người dùng, thiết lập hệ thống, và duy trì hoạt động.',
  },
];

function RolePage() {
  const { lecturerStore, handleGetMe } = useAuth();
  const { data, isSuccess } = handleGetMe();
  const { handleGetCurrentTerm } = useTerm();
  const dispatch = useDispatch();

  if (isSuccess) handleGetCurrentTerm(data.lecturer.majorId);

  const { handleGetAllMajor } = useMajor();
  const { handleGetAllTermByMajor } = useTerm();
  const { data: dataMajorFetch, isSuccess: successMajor } = handleGetAllMajor();

  useEffect(() => {
    if (successMajor) dispatch(setAllMajor(dataMajorFetch.majors));
  }, [successMajor]);


  //!<... DON'T REMOVE
  const { data: dataTermFecth, isSuccess: successTerm } = handleGetAllTermByMajor(
    data?.lecturer.majorId,
  );
  //! DON'T REMOVE..>

  const accessToken: string = getValueFromLocalStorage('accessToken') || '';

  return (
    <>
      {!accessToken && lecturerStore.currentRoleRender === '' ? (
        <Navigate to='/auth/login' />
      ) : (
        <Box
          position={'fixed'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          bgcolor={'rgba(0,0,0,0.1)'}
          zIndex={9999}
          top={0}
          bottom={0}
          left={0}
          right={0}
        >
          <Box
            sx={{
              py: 30,
              px: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 14,
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
        </Box>
      )}
      ;
    </>
  );
}
export default RolePage;
