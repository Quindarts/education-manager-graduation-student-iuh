import { useTerm } from '@/hooks/api/useQueryTerm';
import { Icon } from '@iconify/react';
import { Box, keyframes, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DetailModal from './DetailModal';
import useSidebar from '@/hooks/ui/useSidebar';
import { getTimeDifference } from '@/utils/convertDataTable';

const basicColor = '#3761B4FF';
const progressColor = '#e9f1fc';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

function TimeLine() {
  const { termStore } = useTerm();
  const { currentTerm } = termStore;

  const currentDate = getTimeDifference(currentTerm.startDate, dayjs().toString());
  const allDate = getTimeDifference(currentTerm.startDate, currentTerm.endDate);

  const [precent, setPrecent] = useState(0);

  useEffect(() => {
    const precent = (currentDate / allDate) * 100;
    setPrecent(precent);
  }, []);

  const max = 100;
  const space = 7;

  const partContent = [
    {
      icon: 'mdi:check-circle',
      isActive: true,
      isDone: true,
      label: 'Bắt đầu học kì',
      key: 'startTerm',
      section: (
        <Box>
          <Typography variant='body1' color='initial'></Typography>
        </Box>
      ),
      desc: 'Quý thầy cô cập danh sách đề tài trong học kì mới. Quản lý chuyên ngành sẽ duyệt danh sách các đề tài',
      date: currentTerm.startDate,
      point: 0,
    },
    {
      icon: 'mdi:account-supervisor-circle',
      isActive: false,
      isDone: false,
      key: 'groupStudent',
      label: 'Tạo Nhóm hướng dẫn',
      section: <Box>Discuss the main topics for the project.</Box>,
      desc: 'Sinh viên tham gia học phần Khóa luận tốt nghiệp chọn các đề tài của thầy/cô',
      date: '2024-09-05',
      point: 1.5 * (max / space),
    },
    {
      icon: 'emojione-v1:document',
      isActive: false,
      isDone: false,
      key: 'groupSupportScore',
      label: 'Chấm hướng dẫn',
      section: <Box>Prepare and submit your report here.</Box>,
      desc: 'Giảng viên có vai trò nhập điểm hướng dẫn cho nhóm mình. Điểm được đánh giá theo tiêu chí hướng dẫn.',
      date: '2024-12-01',
      point: 3 * (max / space),
    },
    {
      icon: 'emojione-v1:document',
      isActive: false,
      isDone: false,
      key: 'groupLecturerScore',
      label: 'Phản biện và báo cáo',
      section: <Box>Review your project with the lecturer.</Box>,
      desc: 'Giảng viên được phân công vào các nhóm giảng viên (phản biện, hội đồng, poster). Chấm điểm theo tiêu chí phản biện và báo cáo.',
      date: '2024-12-10',
      point: 4.5 * (max / space),
    },
    {
      icon: 'entypo:sound',
      isActive: false,
      isDone: false,
      label: 'Công bố kết quả',
      key: 'result',
      section: <Box>Review your project with the lecturer.</Box>,
      desc: 'Xuất phiếu chấm điểm.Thống kê điểm của nhóm hướng dẫn. Kết quả được công bố cho toàn bộ sinh viên trong học phần',
      date: currentTerm.endDate,
      point: 5.8 * (max / space),
    },
  ];
  const [openDetailModal, setOpenDetailModal] = useState({
    isOpen: false,
    part: '',
    label: '',
  });
  const handleOpenDetailModal = (part: string, label: string) => {
    setOpenDetailModal({ part, label, isOpen: true });
  };
  const handleCloseDetailModal = () => {
    setOpenDetailModal((pre) => ({ ...pre, isOpen: false }));
  };
  const { isOpen } = useSidebar();
  return (
    <Box>
      <Box
        position={'relative'}
        bgcolor={progressColor}
        borderRadius={10}
        height={18}
        width={isOpen ? 'calc(60vw - 72px)' : 'calc(70vw - 20px)'}
        my={4}
      >
        <Box
          height={18}
          sx={{
            transition: 'width 1s ease-in-out, background-color 0.5s ease-in-out',
            borderRadius: 10,
            width: `${precent}%`,
            backgroundImage: 'linear-gradient(135deg, #0d5db6, #6a11cb, #2575fc, #7bdcb5)',

            '&:hover': {
              backgroundImage: 'linear-gradient(135deg, #0d5db6, #6a11cb, #2575fc, #7bdcb5)',
            },
          }}
        ></Box>

        {partContent.map((part, index) => (
          <Tooltip
            onClick={() => handleOpenDetailModal(part.key, part.label)}
            title='Xem thông tin'
          >
            <Box
              sx={{
                cursor: 'pointer',
              }}
              position={'absolute'}
              top={'-20px'}
              left={`${part.point}%`}
            >
              <Typography
                position={'absolute'}
                top={-26}
                width={150}
                variant='h6'
                fontWeight={'500'}
                color={'primary.main'}
              >
                {dayjs(part.date).format('DD/MM/YYYY')}
              </Typography>
              <Box
                key={index}
                width={52}
                display='flex'
                alignItems='center'
                justifyContent='center'
                height={52}
                borderRadius={50}
                border={!part.isActive ? '5px solid white' : '5px solid #3761B4FF'}
                bgcolor={!part.isActive ? basicColor : 'white'}
                position={'absolute'}
                sx={{
                  animation: `${fadeInScale} 0.5s ease-in-out`,
                  transition: 'transform 0.5s ease-in-out',
                  transform: 'scale(0.8)',
                  '&:hover': {
                    transform: 'scale(1)',
                    cursor: 'pointer',
                  },
                  '&:focus': {
                    backgroundColor: 'red',
                  },
                }}
              >
                <Icon width={30} icon={part.icon} color={!part.isActive ? 'white' : '#3761B4FF'} />
              </Box>
              <Typography
                position={'relative'}
                top={60}
                variant='body1'
                fontWeight={'bold'}
                color='primary.dark'
              >
                {part.label}{' '}
              </Typography>
              <Box
                position={'relative'}
                width={140}
                bgcolor={'grey.100'}
                py={2}
                px={4}
                borderRadius={2}
                top={60}
              >
                <Typography variant='body2' color='grey.600'>
                  {part.desc}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        ))}
      </Box>
      <DetailModal
        open={openDetailModal.isOpen}
        part={openDetailModal.part}
        label={openDetailModal.label}
        onClose={handleCloseDetailModal}
      />
    </Box>
  );
}

export default TimeLine;
