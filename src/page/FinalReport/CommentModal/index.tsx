import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import useFinalReport from '@/hooks/api/useQueryFinalReport';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useLayoutEffect, useState } from 'react';

function CommentEventModal(props: any) {
  const { onClose, open, reportId, name, oldComment } = props;
  const { onCommentFinalReport } = useFinalReport();

  const [comment, setComment] = useState('Bài làm đáp ứng đủ các yêu cầu đề ra.');
  const { handleGetGroupStudentById } = useGroupStudent();
  const { data: fetchGr, isLoading: loadGr } = handleGetGroupStudentById(reportId);
  const { mutate: commentFetch } = onCommentFinalReport(reportId);
  const handleSubmit = () => {
    commentFetch(comment);
    onClose();
  };
  useLayoutEffect(() => {
    if (oldComment) setComment(oldComment);
  }, [reportId, oldComment]);
  return (
    <Modal onClose={onClose} open={open}>
      <Box width='100%' display='flex' flexDirection='column' px={10} pb={12}>
        {!loadGr ? (
          <Box>
            <Box>
              {fetchGr?.groupStudent?.members.map((std: any) => (
                <Box>
                  <Typography variant='body1'>  
                    <Typography component={'span'} mr={20} variant='body1'>
                      Mã sinh viên: {std?.student?.username}{' '}
                    </Typography>
                    <Typography component={'span'} variant='body1'>
                      Họ tên: {std?.student?.fullName}{' '}
                    </Typography>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}

        <Box mt={10} width={'100%'}>
          <CustomTextField
            placeholder='Nhận xét bài làm'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            defaultValue={oldComment}
            label='Nhận xét bài làm'
            multiline
            rows={4}
          />
        </Box>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} sx={{ width: '50%' }} color='success' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='subway:tick' />
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default CommentEventModal;
