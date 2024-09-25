import DropDown from '@/components/ui/Dropdown';
import useEvaluation from '@/hooks/api/useQueryEvalutaion';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { handleSearch } from '@/utils/search';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import PreviewModal from './PreviewModal';
import TitleManager from '@/components/ui/Title';
import { getFileNameToExportDocx } from '@/utils/validations/evaluation.validation';
import SearchInput from './SearchInput';
import { useAuth } from '@/hooks/api/useAuth';
import { RoleCheck } from '@/types/enum';
import { TypeEvaluation } from '@/services/apiEvaluation';

const processingDataResponse = (data: any[]) => {
  if (!data) {
    return [];
  } else return data.map((gr: any) => ({ name: gr.name, _id: gr.id ? gr.id : gr.groupLecturerId }));
};

const CardGrLecturerMember = (members: any[]) => {
  return (
    <Box sx={{ px: 4, py: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 4, mt: 4 }}>
      <Box>
        <Typography variant='h6' mb={2} fontWeight={'bold'} color='grey.700'>
          Thông tin nhóm giảng viên:
        </Typography>
      </Box>
      <Box>
        {members.map((member) => (
          <Typography variant='body1' color='grey.600'>
            GV: {member.username} - {member.fullName}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
const CardStudents = ({
  id,
  members,
  groupStudentName,
  lecturerSupport,
  topicName,
  checked,
  changeChecked,
  handleOpenPreview,
  evaluators,
}) => {
  return (
    <Box sx={{ px: 10, py: 6, width: '100%', bgcolor: 'grey.100', borderRadius: 4 }}>
      <Checkbox checked={checked} disabled onChange={() => changeChecked(id)} />
      <Button
        onClick={() =>
          handleOpenPreview(id, groupStudentName, topicName, lecturerSupport, members, evaluators)
        }
      >
        Xem preview
      </Button>
      <Typography variant='body1' fontWeight={'bold'} color='initial'>
        {topicName}
      </Typography>
      <Typography variant='body1' fontWeight={'600'} color='initial'>
        {groupStudentName} - GVHD: {lecturerSupport}
      </Typography>
      <Box>
        <Typography variant='body2' mb={1} fontWeight={'600'} color='grey.700'>
          Thông tin chi tiết:
        </Typography>
      </Box>
      <Box>
        {members?.map((member) => (
          <Typography variant='body1' color='grey.600'>
            SV: {member.username} - {member.fullName}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
//!: Bao gồm phản biện, poster, hội đồng.

function InfoOtherGroupFile({ evaluations, changeCurrentGrLecturers, typeEvaluation }: any) {
  //TODO: HOOKS
  const [isLoading, setLoading] = useState(false);
  const [groupLecturersDropdown, setGroupLecturersDropdown] = useState([]);
  const [groupLecturers, setGroupLecturers] = useState([]);
  const [groupsToExport, setGroupsToExport] = useState([]);
  const [currentGrId, setCurrentGrId] = useState('1111');

  //TODO CALL API
  const { handleGetGroupLecturerById } = useGroupLecturer();
  const { handleGetDataToExportReportDocx } = useEvaluation();
  const { lecturerStore } = useAuth();
  const currentRole = lecturerStore.currentRoleRender;
  const {
    data: fetchGrLecturer,
    isLoading: loadingGrL,
    isSuccess: successfetchGrLecturer,
    refetch,
  } = handleGetGroupLecturerById(currentGrId);

  useEffect(() => {
    setLoading(true);
    handleGetDataToExportReportDocx(typeEvaluation).then((data) => {
      const checked = typeEvaluation === TypeEvaluation.REVIEWER ? typeEvaluation : 'REPORT';
      const dataConvert =
        currentRole === RoleCheck.LECTURER
          ? data.groupLecturers.filter((gr: any) => gr.type.includes(checked))
          : data.groupLecturers;

      setGroupLecturersDropdown(processingDataResponse(dataConvert));
      changeCurrentGrLecturers(dataConvert);
      setGroupLecturers(
        dataConvert.map((gr) => {
          if (gr.groupLecturerId) {
            return {
              ...gr,
              id: gr.groupLecturerId,
            };
          } else return gr;
        }),
      );
      setLoading(false);
    });
  }, []);

  const handleChangeDropdown = (groupLecturerId: string) => {
    setCurrentGrId(groupLecturerId);
  };

  useLayoutEffect(() => {
    setIsClearStd(true);
    setGroupsToExport([]);

    if (successfetchGrLecturer) {
      setGroupsToExport(
        fetchGrLecturer?.groupLecturer?.groupStudents.map((gr) => ({ ...gr, checked: true })),
      );
    }
    // Nếu là xuất tất cả thì lấy fetch đầu tiên. Nếu không thì lấy data checked qua checkbox
    if (currentGrId === '1111') {
      changeCurrentGrLecturers(groupLecturers);
    } else {
      changeCurrentGrLecturers(groupLecturers.filter((gr) => gr.id === currentGrId));
    }
  }, [currentGrId, successfetchGrLecturer]);

  //TODO: SEARCH BY FIELD
  //*Group-students
  const [searchStudentType, setSearchStudentType] = useState('topicName');
  const [keywordStudent, setKeywordStudent] = useState('');
  const [isClearStd, setIsClearStd] = useState(false);
  const handleSearchStudentType = (type: string) => {
    setSearchStudentType(type);
  };
  const handleKeywordStudent = (key: string) => {
    setKeywordStudent(key);
  };
  const handleClearSearch = (clear: boolean) => {
    setIsClearStd(clear);
  };
  //TODO: checkbox
  const changeChecked = (id: string) => {
    const updated = groupsToExport.map((gr) => {
      if (gr.id === id) {
        gr.checked = !gr.checked;
      }
      return gr;
    });
    setGroupsToExport(updated);
  };
  //TODO: Modal
  const [openPreview, setOpenPreview] = useState({
    id: '',
    groupStudentName: '',
    topicName: '',
    lecturerSupport: '',
    students: [],
    evaluators: [],
    isOpen: false,
  });
  const handleOpenPreview = (
    id: string,
    groupStudentName: string,
    topicName: string,
    lecturerSupport: string,
    students: any[],
    evaluators: any[],
  ) => {
    setOpenPreview({
      id,
      groupStudentName: groupStudentName,
      topicName: topicName,
      lecturerSupport: lecturerSupport,
      students: students,
      evaluators: evaluators,
      isOpen: true,
    });
  };
  const handleClosePreview = () => {
    setOpenPreview((pre) => ({ ...pre, isOpen: false }));
  };

  return (
    <>
      <Box>
        {isLoading ? (
          <></>
        ) : (
          <>
            <DropDown
              label='Danh nhóm giảng viên'
              options={[
                {
                  _id: '1111',
                  name: `Xuất phiếu (word) tất cả nhóm chấm ${getFileNameToExportDocx(typeEvaluation)}`,
                },
                ...groupLecturersDropdown,
              ]}
              defaultValue={currentGrId}
              onChange={(e: any) => {
                handleChangeDropdown(e.target.value);
              }}
            />
            <Box>
              {groupLecturers &&
                groupLecturers
                  .filter((gr) => gr.id === currentGrId)
                  .map((gr) => CardGrLecturerMember(gr.members))}
            </Box>
            {currentGrId === '1111' ? (
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                height={400}
              >
                <img width={200} src='/images/allFile_drawer.png' />
                <TitleManager icon='charm:circle-tick' variant='h5' color='grey.600'>
                  Có tất cả {groupLecturers.length} nhóm
                </TitleManager>
              </Box>
            ) : (
              <Box>
                <Typography variant='h6' fontWeight={'bold'} mb={4} color='primary'>
                  Nhóm sinh viên được phân công
                </Typography>

                {groupsToExport.length === 0 ? (
                  <Box
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                  >
                    <img width={150} src='/images/nodata.webp' alt='' />
                    <Typography variant='body1' color='grey.600'>
                      {' '}
                      Không có nhóm sinh viên nào được phân chấm.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography variant='body1' mx={4} mb={2} color='success.dark'>
                      Đã chọn{' '}
                      {groupsToExport.length ===
                      groupsToExport.filter((gr) => gr.checked === true).length
                        ? ' tất cả '
                        : groupsToExport.filter((gr) => gr.checked === true).length}{' '}
                      nhóm
                    </Typography>
                    <SearchInput
                      handleClearSearch={handleClearSearch}
                      handleSearchType={handleSearchStudentType}
                      handleKeywords={handleKeywordStudent}
                      isClear={isClearStd}
                    />
                    <Box display={'flex'} gap={5} mt={5} flexWrap={'wrap'}>
                      {groupsToExport &&
                        handleSearch(groupsToExport, searchStudentType, keywordStudent)?.map(
                          (gr) => (
                            <>
                              <CardStudents
                                id={gr?.id}
                                members={gr?.members}
                                lecturerSupport={gr.lecturerName}
                                groupStudentName={gr.name}
                                topicName={gr.topicName}
                                checked={gr.checked}
                                changeChecked={changeChecked}
                                handleOpenPreview={handleOpenPreview}
                                evaluators={groupLecturers.filter((gr) => gr.id === currentGrId)[0]}
                              />
                            </>
                          ),
                        )}
                    </Box>
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </Box>

      <PreviewModal
        onClose={handleClosePreview}
        open={openPreview.isOpen}
        groupStudentName={openPreview.groupStudentName}
        topicName={openPreview.topicName}
        lecturerSupport={openPreview.lecturerSupport}
        students={openPreview.students}
        evaluators={openPreview?.evaluators}
        evaluations={evaluations}
        typeEvaluation={typeEvaluation}
      />
    </>
  );
}

export default InfoOtherGroupFile;
