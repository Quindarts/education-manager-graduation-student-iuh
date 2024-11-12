import { Box, Paper, Typography } from '@mui/material';
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
export default function DashboardOfAdmin() {
  const [selectPart, setSelectPart] = useState(EnumStatusStudent.PASS_ADVISOR);
  const handleSelect = (part: EnumStatusStudent) => {
    setSelectPart(part);
  };
  const {
    handleGetSatusOfStudents,
    handleGetBarChartDataOfPoint,
    statusOfStudents,
    barChartDataOfPoint,
  } = useStatistical();
  const { handleGetCountOfStudent } = useStudent();
  const { data: dataCountStd } = handleGetCountOfStudent();
  useEffect(() => {
    handleGetSatusOfStudents(selectPart);
    handleGetBarChartDataOfPoint();
    return () => {
      handleGetSatusOfStudents(selectPart);
      handleGetBarChartDataOfPoint();
    };
  }, []);
  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  return (
    <Box sx={{ px: 10, bgcolor: 'white', py: 10, minHeight: '60vh', my: 10 }}>
      <>
        <Box mt={8} display={'flex'} gap={8}>
          <Box>
            <Typography fontWeight={600} color='black ' component={'h5'} variant='h5'>
              Thống kê khóa luận tốt nghiệp {termStore.currentTerm?.name} - {majorStore.currentMajor?.name}
            </Typography>
          </Box>
        </Box>
        <Box my={10}>
          <Box my={4}>
            <StatisticManager />
          </Box>
          <Box id='' gap={8} display={'flex'} m={10}>
            <Paper sx={{ px: 10, py: 4, width: '70%' }}>
              {' '}
              <Typography mb={6} mt={10} variant='h6' fontWeight={''} color='grey.700'>
                Phổ điểm trung bình của tất cả sinh viên 
              </Typography>
              <Box sx={{ my: 10 }}>
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
                    series={[{ data: Object.values(barChartDataOfPoint) }]}
                    width={800}
                    height={300}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                  />
                )}
              </Box>
            </Paper>
            <Paper sx={{ px: 10, py: 4, width: '30%' }}>
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
              <>
                {statusOfStudents === 0 ? (
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
                      }}
                      margin={{ top: 50, bottom: 50 }}
                      slotProps={{
                        legend: {
                          direction: 'row',
                          position: { vertical: 'bottom', horizontal: 'middle' },
                        },
                      }}
                      width={400}
                      height={300}
                    />
                  </Box>
                ) : (
                  <PieChart
                    series={[
                      {
                        innerRadius: 31,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        data: [
                          { label: 'Rớt', value: dataCountStd?.count - statusOfStudents },
                          {
                            value: statusOfStudents,
                            label: `Đậu ${((statusOfStudents / dataCountStd?.count) * 100).toFixed(0)}%`,
                          },
                        ],
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                      },
                    }}
                    colors={['#0052b1', '#22c55e']}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                      },
                    }}
                    width={400}
                    height={250}
                  />
                )}
              </>
            </Paper>
          </Box>
        </Box>
      </>
    </Box>
  );
}
