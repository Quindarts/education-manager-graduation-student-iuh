import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, Typography, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useMajor } from '@/hooks/api/useQueryMajor';
import SearchInput from './SearchInput';
import { removeVietnameseTones } from '@/utils/search';
import { useNotificationLecturer } from '@/hooks/api/useQueryNotificationLecturer';

const handleSearch = (keywords: string, lecturers: any[]) => {
  if (keywords.length === 0) {
    return lecturers;
  }
  return lecturers.filter((lec) =>
    removeVietnameseTones(lec.fullName.toLowerCase()).includes(
      removeVietnameseTones(keywords.toLowerCase()),
    ),
  );
};
const string = `<p style="font-size: 16px; color: #0052b1;">Kính mời quý Thầy/Cô tham gia hướng dẫn chuyên ngành tại khoa CNTT. Vai trò của Thầy/Cô gồm:</p>
<ul style="color: #333; margin-left: 20px;">
  <li>Hướng dẫn sinh viên thực hiện đề tài</li>
  <li>Chấm điểm cho nhóm sinh viên</li>
</ul>
<p style="font-size: 16px; color: #0052b1;">Trân trọng cảm ơn sự đóng góp của Thầy/Cô!</p>
`;
function AddLecturerModal(props: any) {
  const { onClose, open } = props;
  const { termStore } = useTerm();
  const { currentTerm } = termStore;
  const { majorStore } = useMajor();

  const { onCreateNotificationOfLecturerIds } = useNotificationLecturer();
  const { mutate: createNotifys } = onCreateNotificationOfLecturerIds();
  const { handleLecturerTermsToAdd, onCreateLecturerTerm } = useLecturerTerm();
  const {
    data: lecturerFetch,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
  } = handleLecturerTermsToAdd();
  const { mutate: create, isSuccess: successCreate } = onCreateLecturerTerm();

  const [keywords, setKeywords] = useState('');
  const [lecturers, setLecturers] = useState([]);
  useEffect(() => {
    if (isSuccess || isFetching) {
      setLecturers(lecturerFetch?.lecturerTerms?.map((l: any) => ({ ...l, checked: false })));
    }
  }, [isSuccess, isFetching]);

  const handleSubmitCreateLecturer = () => {
    const listLecturers = lecturers
      ?.filter((l) => l.checked)
      ?.map((l) => ({ lecturerId: l.lecturerId, termId: `${currentTerm.id}` }));

    listLecturers.map((data) => {
      create(data);
    });
    createNotifys({
      title: `Thông báo: Kính mời quý thầy (cô) tham gia hướng dẫn khóa luận tốt nghiệp chuyên ngành ${majorStore.currentMajor.name}`,
      content: string,
      lecturerIds: listLecturers.map((l) => l.lecturerId),
    });
  };
  useEffect(() => {
    onClose();
  }, [successCreate]);
  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open]);

  const changeSearch = (s: string) => {
    setKeywords(s);
  };
  const handleChecked = (id: string) => {
    let arr = lecturers?.map((l: any) => {
      if (l.lecturerId === id) {
        let obj = { ...l, checked: !l.checked };
        return obj;
      } else return l;
    });
    setLecturers(arr);
  };
  return (
    <Modal maxWidth='md' open={open} onClose={onClose}>
      <Box pb={10} px={10}>
        <TitleManager
          mb={8}
          mt={2}
          icon='mingcute:user-add-2-fill'
          variant='h6'
          textTransform={'uppercase'}
        >
          Mời giảng viên tham gia chấm (hướng dẫn) khóa luận ngành {majorStore.currentMajor.name}
        </TitleManager>
        <Box>
          {isLoading ? (
            <SekeletonUI />
          ) : (
            <Box>
              <Typography variant='h6' mt={4} mb={2} fontWeight={'bold'} color='grey.700'>
                Danh sách giảng viên khoa công nghệ thông tin
              </Typography>
              <SearchInput changeSearch={changeSearch} keywords={keywords} sx={{ my: 6 }} />
              <Box display={'flex'} flexWrap={'wrap'} gap={4}>
                {handleSearch(keywords, lecturers)?.map((lec: any) => (
                  <Box
                    sx={{
                      bgcolor: 'grey.100',
                      py: 4,
                      px: 2,
                      width: 'calc(25% - 8px)',
                      borderRadius: 3,
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      color='success'
                      onChange={() => handleChecked(lec.lecturerId)}
                      checked={lec?.checked}
                    />
                    <Box>
                      <Typography variant='body1' color='primary.dark'>
                        Ngành {lec?.majorName}
                      </Typography>
                      <Typography variant='body1' color='initial'>
                        Giảng viên: {lec?.fullName}
                      </Typography>
                      <Typography variant='body1' color='initial'>
                        Mã GV: {lec?.username}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    setLecturers((pre) => pre.map((l) => ({ ...l, checked: true })));
                  }}
                >
                  Chọn tất cả
                </Button>
                {lecturers?.filter((l) => l.checked).length > 0 && (
                  <Button
                    color='error'
                    onClick={() => {
                      setLecturers((pre) => pre.map((l) => ({ ...l, checked: false })));
                    }}
                  >
                    X Bỏ chọn
                  </Button>
                )}
                <Typography
                  textTransform={'uppercase'}
                  mt={20}
                  mb={4}
                  variant='body1'
                  fontWeight={'bold'}
                >
                  Đã chọn : {lecturers?.filter((l) => l.checked).length} giảng viên
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
          <Button variant='contained' color='primary' onClick={onClose}>
            <Icon icon='mdi:close-outline' />
            Hủy
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => handleSubmitCreateLecturer()}
            type='submit'
          >
            <Icon icon='material-symbols:save-outline' />
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddLecturerModal;
