import TitleManager from '@/components/ui/Title';
import {
  Badge,
  Box,
  Button,
  Card,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Task from './Task';
import ListTeamStudent from './ListTeamStudent';

export const ENUM_STATUS_LECTURER = {
  NO_GROUP: 'NO_GROUP',
  GRADING_INSTRUCTION: 'GRADING_INSTRUCTION', // chấm hd
  GRADING_ASSEMBLY: 'GRADING_ASSEMBLY', // chấm hđ
  POSTER_SCORING: 'POSTER_SCORING', // chấm poster
};

const TASKS = [
  {
    id: 1,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    icon: 'noto:green-book',
    time: '8 hrs',
    days: '5 days left',
  },
  {
    id: 2,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    icon: 'noto:green-book',
    time: '6 hrs',
    days: '6 days left',
  },
  {
    id: 3,
    status: 'Completed',
    name: 'Giảng viên A',
    icon: 'noto:green-book',
    time: '13 hrs',
    days: '4 days left',
  },
  {
    id: 4,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    icon: 'noto:green-book',
    time: '22 hrs',
    days: '2 days left',
  },
  {
    id: 5,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    icon: 'noto:green-book',
    time: '2 hrs',
    days: '1 day left',
    newOrder: true,
  },
  {
    id: 6,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    icon: 'noto:green-book',
    time: '2 hrs',
    days: '1 day left',
    newOrder: true,
  },
  {
    id: 7,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    icon: 'noto:green-book',
    time: '2 hrs',
    days: '1 day left',
    newOrder: true,
  },
];

function GroupReportPage() {
  const listGroupStudent = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const [currentTeam, setCurrentTeam] = useState(0);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Chọn nhóm sinh viên chấm Hội đồng',
      description: (
        <ListTeamStudent setCurrentTeam={setCurrentTeam} listGroupStudent={listGroupStudent} />
      ),
    },
    {
      label: 'Tạo nhóm giảng viên chấm điểm nhóm sinh viên',
      description: <Task tasks={TASKS} team={currentTeam} />,
    },
    {
      label: 'Kết quả',
      description: `Tạo nhóm thành công.`,
    },
  ];
  return (
    <Box>
      <Box sx={{ maxWidth: 'full' }}>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={index === 2 ? <Typography variant='caption'></Typography> : null}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <Box>
                    <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      {index === steps.length - 1 ? 'Lưu thông tin' : 'Bước tiếp theo'}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Quay lại
                    </Button>
                  </Box>
                </Box>
                <Box>{step.description}</Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Tất cả các bước đã hoàn thành</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Làm lại
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default GroupReportPage;
