import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Task from './Task';
import ListLecturerGroup from './ListLecturerGroup';
import DropDown from '@/components/ui/Dropdown';
import useAssign from '@/hooks/api/useQueryAssign';
import { Icon } from '@iconify/react';
import {
  ENUM_GROUP_LECTURER,
  typeConvertGroupLecturer,
} from '@/utils/validations/groupLecturer.validation';

function GroupReportPage() {
  const listGroupStudent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [currentTeam, setCurrentTeam] = useState<any>({ id: '', team: {} });
  const [groupStudents, setGroupStudents] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const handleGroupStudentHavedAssign = (gr: any) => {
    setGroupStudents(gr);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setCurrentTeam({ id: '', team: {} });
    setGroupStudents([]);
    setActiveStep(0);
  };

  const [checkedTyper, setCheckedTyper] = useState<any>(ENUM_GROUP_LECTURER[0]?._id);

  const { onCreateAssignByType, handletGetGroupStudentNoAssignByType } = useAssign();

  const { mutate: createAssign, isSuccess: successCreate } = onCreateAssignByType(checkedTyper);
  const { data, isSuccess, isLoading, isFetching } =
    handletGetGroupStudentNoAssignByType(checkedTyper);

  const handleCreateAssign = () => {
    createAssign({
      groupLecturerId: currentTeam.id,
      listGroupStudentId: groupStudents.map((grStudent) => grStudent.id),
    });
  };
  useEffect(() => {
    if (activeStep === 2 && successCreate === true) handleNext();
  }, [successCreate]);

  const steps = [
    {
      label: (
        <DropDown
          label='Chọn loại nhóm phân công chấm điểm'
          value={checkedTyper}
          options={ENUM_GROUP_LECTURER}
          disabled={activeStep !== 0}
          onChange={(e: any) => {
            setCheckedTyper(e.target.value);
          }}
        />
      ),
      description: (
        <ListLecturerGroup
          checkedTyper={checkedTyper}
          setCurrentTeam={setCurrentTeam}
          listGroupStudent={listGroupStudent}
        />
      ),
    },
    {
      label: 'Phân công nhóm giảng viên vừa chọn để chấm đề tài',
      description: (
        <Task
          groupStudents={data?.groupStudent}
          typeGroupLecturer={checkedTyper}
          handleGroupStudentHavedAssign={handleGroupStudentHavedAssign}
          team={currentTeam.team}
        />
      ),
    },
    {
      label: `Thông tin phân công ${typeConvertGroupLecturer(checkedTyper)}`,
    },
  ];
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <Box sx={{ maxWidth: 'full' }}>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                sx={{
                  fontSize: 14,
                  color: 'primay.dark',
                }}
                optional={
                  index === 2 ? (
                    <Box>
                      <Typography my={4} variant='body2' color='primary'>
                        Nhóm giảng viên: {currentTeam?.team?.name}
                      </Typography>
                      <Typography variant='body2' color='primary'>
                        Danh sách nhóm sinh viên
                      </Typography>
                      <>
                        {groupStudents?.map((gr) => (
                          <Typography variant='body2' color='primary'>
                            {gr.name}
                          </Typography>
                        ))}
                      </>
                    </Box>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <Box>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      <Icon icon='eva:arrow-ios-back-fill' width={16} />
                      Quay lại
                    </Button>
                    {index === steps.length - 1 ? (
                      <Button
                        variant='contained'
                        onClick={handleCreateAssign}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        <Icon icon='mingcute:save-line' width={16} />
                        Lưu thông tin
                      </Button>
                    ) : (
                      <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                        Bước tiếp theo
                        <Icon icon='ic:baseline-navigate-next' width={16} />
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box>{step.description}</Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography color={'success'}>Phân công nhóm thành công</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              <Icon icon='carbon:reset-alt' width={16} />
              Phân công lại
            </Button>
          </Paper>
        )}
      </Box>
    </Paper>
  );
}

export default GroupReportPage;
