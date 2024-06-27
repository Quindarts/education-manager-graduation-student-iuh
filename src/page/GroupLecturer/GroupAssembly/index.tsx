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

const DROP_VALUE = [
  {
    name: 'Nhóm chấm Phản biện',
    _id: 'reviewer',
  },
  {
    name: 'Nhóm chấm Poster',
    _id: 'report_poster',
  },
  {
    name: 'Nhóm chấm Hội đồng',
    _id: 'report_council',
  },
];
const typeConvert = (type: string) => {
  switch (type) {
    case 'reviewer':
      return 'Nhóm chấm Phản biện';
    case 'report_poster':
      return 'Nhóm chấm Poster';
    case 'report_council':
      return 'Nhóm chấm Hội đồng';
  }
  return;
};

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

  const [checkedTyper, setCheckedTyper] = useState<any>(DROP_VALUE[0]?._id);

  const { onCreateAssignByType, handletGetGroupStudentNoAssignByType } = useAssign();

  const { mutate: createAssign, isSuccess: successCreate } = onCreateAssignByType(checkedTyper);
  const { data, isSuccess, isLoading, isFetched } =
    handletGetGroupStudentNoAssignByType(checkedTyper);
  console.log('🚀 ~ handleCreateAssign ~ groupStudents:', groupStudents);

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
          options={DROP_VALUE}
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
      label: `Thông tin phân công ${typeConvert(checkedTyper)}`,
    },
  ];
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
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
