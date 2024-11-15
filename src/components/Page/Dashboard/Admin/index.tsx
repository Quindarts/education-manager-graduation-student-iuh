import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StatisticManager from './Statistic';
import { BarChart, DefaultizedPieValueType, pieArcLabelClasses, PieChart } from '@mui/x-charts';
import useStatistical from '@/hooks/api/useQueryStatistical';
import { EnumStatusStudent } from '@/types/enum';
import DropDown from '@/components/ui/Dropdown';
import theme from '@/theme/theme';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';

// Giai đoạn phản biện
// giai đoạn hướng dẫn
// giai đoạn báo cáo
const DROP_VALUE = [
  {
    _id: EnumStatusStudent.PASS_ADVISOR,
    name: 'Hướng dẫn',
  },
  {
    _id: EnumStatusStudent.PASS_REVIEWER,
    name: 'Phản biện',
  },
  {
    _id: EnumStatusStudent.PASS_REPORT,
    name: 'Báo cáo',
  },
];
export const getFailPart = (part) => {
  return 'FAIL_' + EnumStatusStudent[part].split('_')[1];
};
export default function DashboardOfAdmin() {
  const [selectPart, setSelectPart] = useState(EnumStatusStudent.PASS_ADVISOR);
  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  const handleSelect = (part: EnumStatusStudent) => {
    setSelectPart(part);
  };
  const {
    handleGetPassOfStudents,
    handleGetFailOfStudents,
    handleGetBarChartDataOfPoint,
    statusPassOfStudents,
    statusFailOfStudents,
    barChartDataOfPoint,
    loadingPie,
  } = useStatistical();
  const { handleGetCountOfStudent } = useStudent();
  const { data: dataCountStd } = handleGetCountOfStudent();
  useEffect(() => {
    handleGetPassOfStudents(selectPart);
    handleGetFailOfStudents(getFailPart(selectPart) as EnumStatusStudent);
    handleGetBarChartDataOfPoint();
    return () => {
      handleGetPassOfStudents(selectPart);
      handleGetFailOfStudents(getFailPart(selectPart) as EnumStatusStudent);
      handleGetBarChartDataOfPoint();
    };
  }, [termStore.currentTerm.id, selectPart]);

  return (
    <Box sx={{ px: 10, bgcolor: 'white', py: 10, minHeight: '60vh', my: 10 }}>
      <>
        <Box mt={8} display={'flex'} gap={8}>
          <Box>
            <Typography fontWeight={600} color='black ' component={'h5'} variant='h5'>
              Thống kê khóa luận tốt nghiệp {termStore.currentTerm?.name} -{' '}
              {majorStore.currentMajor?.name}
            </Typography>
          </Box>
        </Box>
        <Box my={10}>
          <Box my={4}>
            <StatisticManager />
          </Box>
          <Box id='' gap={8} display={'flex'} my={10}>
            <Paper sx={{ px: 10, py: 4, width: '70%' }}>
              {' '}
              <Typography mb={6} mt={10} variant='h6' fontWeight={''} color='grey.700'>
                Phổ điểm trung bình của tất cả sinh viên
              </Typography>
              <Box sx={{ my: 6 }}>
                {Object.values(barChartDataOfPoint).every((item) => item === null) ? (
                  <Box
                    sx={{
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        height: 300,
                        width: '100%',
                        backgroundColor: 'rgba(208, 208, 208, 0.5)',
                        position: 'absolute',
                        zIndex: 1,
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant='h6'
                        sx={{ lineHeight: '300px', height: 300, textAlign: 'center' }}
                        color='initial'
                      >
                        Điểm đang được cập nhật...
                      </Typography>
                    </Box>
                    <BarChart
                      xAxis={[
                        {
                          scaleType: 'band',
                          data: Object.keys(barChartDataOfPoint),
                          colorMap: {
                            type: 'ordinal',
                            colors: [
                              '#ccebc5',
                              '#a8ddb5',
                              '#7bccc4',
                              '#4eb3d3',
                              '#2b8cbe',
                              '#08589e',
                            ],
                          },
                        },
                      ]}
                      series={[{ data: [20, 40, 50, 100, 80, 60, 40, 50] }]}
                      height={300}
                      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                  </Box>
                ) : (
                  <BarChart
                    xAxis={[
                      {
                        scaleType: 'band',
                        label: 'Điểm',
                        data: Object.keys(barChartDataOfPoint),
                        colorMap: {
                          type: 'ordinal',
                          colors: [
                            '#ccebc5',
                            '#a8ddb5',
                            '#7bccc4',
                            '#4eb3d3',
                            '#2b8cbe',
                            '#08589e',
                          ],
                        },
                      },
                    ]}
                    grid={{ vertical: true, horizontal: true }}
                    series={[
                      {
                        data: Object.values(barChartDataOfPoint),
                        label: 'sinh viên',
                      },
                    ]}
                    sx={{
                      width: {
                        md: 700,
                        lg: 800,
                        xl: 900,
                      },
                    }}
                    height={320}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                  />
                )}
              </Box>
            </Paper>
            <Paper sx={{ px: 6, py: 4, width: '30%' }}>
              <Box
                sx={{
                  mb: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h6' fontWeight={''} color='grey.700'>
                  Số sinh viên đậu/ rớt
                </Typography>
                <Box sx={{ width: 120 }}>
                  <DropDown
                    value={selectPart}
                    onChange={(e: any) => handleSelect(e.target.value)}
                    options={DROP_VALUE}
                  />
                </Box>
              </Box>
              {loadingPie ? (
                <CircularProgress />
              ) : (
                <>
                  {statusFailOfStudents === 0 && statusPassOfStudents === 0 ? (
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          width: '100%',
                          backgroundColor: 'rgba(246, 243, 243, 0.8)',
                          position: 'absolute',
                          zIndex: 1,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant='h6'
                          sx={{ lineHeight: '300px', height: 300, textAlign: 'center' }}
                          color='initial'
                        >
                          Điểm đang được cập nhật...
                        </Typography>
                      </Box>
                      <PieChart
                        series={[
                          {
                            innerRadius: 31,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            data: [
                              { label: 'Rớt 40%', value: 40 },
                              {
                                value: 60,
                                label: `Đậu 60%`,
                              },
                            ],
                          },
                        ]}
                        colors={['#0052b1', '#22c55e']}
                        sx={{
                          [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                          },
                          position: 'relative',
                          left: {
                            md: 50,
                            lg: 60,
                          },
                        }}
                        margin={{ top: 50, bottom: 50 }}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                          },
                        }}
                        width={300}
                        height={300}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <PieChart
                        series={[
                          {
                            innerRadius: 31,
                            highlightScope: { fade: 'series', highlight: 'item' },
                            data: [
                              {
                                label: `Đậu ${(statusPassOfStudents / dataCountStd?.count).toFixed(2)}%`,
                                value: statusPassOfStudents,
                              },
                              {
                                label: `Rớt ${(statusFailOfStudents / dataCountStd?.count).toFixed(2)}%`,
                                value: statusFailOfStudents,
                              },
                              {
                                value:
                                  dataCountStd?.count - statusFailOfStudents - statusPassOfStudents,
                                label: `Chưa chấm ${(((dataCountStd?.count - statusFailOfStudents - statusPassOfStudents) / dataCountStd?.count) * 100).toFixed()}%`,
                              },
                            ],
                          },
                        ]}
                        colors={['#22c55e', '#fcbe00', '#0052b1']}
                        sx={{
                          [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                          },
                          position: 'relative',
                          left: {
                            md: 0,
                            lg: 40,
                            xl: 55,
                          },
                          bottom: 20,
                        }}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'left' },
                            padding: {
                              top: 100,
                            },
                          },
                        }}
                        width={330}
                        height={330}
                      />
                    </Box>
                  )}
                </>
              )}{' '}
            </Paper>
          </Box>
        </Box>
      </>
    </Box>
  );
}
