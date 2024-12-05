import DropDown from '@/components/ui/Dropdown';

import useGroupSupport from '@/hooks/api/useQueryGroupSupport';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import { useGlobalContextReview } from '@/page/ReviewManager/Context';
import { Box, Typography } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';

//!: Chỉ export nhóm hướng dẫn
function InfoGroupSupportFile() {
  //TODO: HOOKS
  const [currentGroup, setCurrentGroup] = useState('');
  const { handleSetGroupStudentId, handleSetContext } = useGlobalContextReview();

  //TODO: CALL API
  const { handleGetMyGroupSupport } = useGroupSupport();
  const { handleGetMemberInGroupStudent } = useMemberGroupStudent();
  const {
    data: detailGroup,
    isLoading: loadingMember,
    isSuccess: successMember,
  } = handleGetMemberInGroupStudent(currentGroup);
  const {
    data: groupFetch,
    isLoading: loadingGroup,
    isSuccess: successGroup,
    isFetching: fetchingGroup,
  } = handleGetMyGroupSupport();

  useLayoutEffect(() => {
    if (successMember === true && successGroup === true) {
      const topicName = groupFetch.groupStudents
        ? groupFetch?.groupStudents.filter((gr: any) => gr.groupStudentId === currentGroup)[0]
            .topicName
        : '';
      const groupStudentName = groupFetch.groupStudents
        ? groupFetch?.groupStudents.filter((gr: any) => gr.groupStudentId === currentGroup)[0]
            .groupStudentName
        : '';
      handleSetContext({
        groupMember:
          detailGroup.members.length > 1 ? detailGroup.members.map((student: any) => student) : [],
        topic: {
          name: topicName,
        },
        groupStudentName: groupStudentName,
      });
    }
  }, [currentGroup, successMember, successGroup]);

  return (
    <Box>
      {loadingGroup || fetchingGroup ? (
        <></>
      ) : (
        <>
          <DropDown
            placeholder='Chọn nhóm sinh viên'
            label='Nhóm sinh viên đang hướng dẫn'
            options={convertGroups(groupFetch?.groupStudents)}
            onChange={(e: any) => {
              setCurrentGroup(e.target.value);
              handleSetGroupStudentId(e.target.value);
            }}
          />
          <Box>
            {loadingMember ? (
              <></>
            ) : (
              <>
                {detailGroup?.members.length < 1 ? (
                  <Box
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    display={'flex'}
                  >
                    <Typography variant='body1' p={4} textAlign={'center'} color='initial'>
                      Nhóm chưa có thành viên nào
                    </Typography>
                    <img width={130} src='/images/nodata.webp' alt='' />
                  </Box>
                ) : (
                  <Box py={4} px={2}>
                    {detailGroup?.members.map((member: any) => (
                      <Box py={4} my={2} borderRadius={2} px={8} bgcolor={'grey.100'}>
                        <Typography my={2} variant='body1' color='initial'>
                          Họ và tên: {member.student.fullName}
                        </Typography>
                        <Typography my={2} variant='body1' color='initial'>
                          Lớp học phần: {member.student.clazzName}
                        </Typography>
                        <Typography my={2} variant='body1' color='initial'>
                          Mã số sinh viên: {member.student.username}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
const convertGroups = (groups: any) => {
  let arr = [];
  if (!groups) {
    return [];
  } else {
    groups.map((group: any) => {
      arr.push({
        _id: group.groupStudentId,
        name: group.groupStudentName,
      });
    });
  }
  return arr;
};

export default InfoGroupSupportFile;
