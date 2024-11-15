import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import useEvent from '@/hooks/api/useQueryEvent';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';

function CommentEventModal(props: any) {
  const { onClose, open, id, groupId, name, oldComment } = props;

  const { onCommentEvent } = useEvent();
  const [comment, setComment] = useState('Bài làm đáp ứng đủ các yêu cầu đề ra.');
  const { handleGetGroupStudentById } = useGroupStudent();
  const { data: fetchGr, isLoading: loadGr } = handleGetGroupStudentById(groupId);
  const { mutate: commentFetch } = onCommentEvent(id);
  const handleSubmit = () => {
    commentFetch({ groupStudentId: groupId, comment });
    onClose();
  };
  useLayoutEffect(() => {
    if (oldComment) setComment(oldComment);
  }, [groupId, oldComment]);
  return (
    <Modal onClose={onClose} open={open}>
      <Box width='100%' display='flex' flexDirection='column' px={10} pb={12}>
        {!loadGr ? (
          <Box>
            <Typography variant='h5' fontWeight={'bold'} mt={6} mb={4}>
              Nhóm {name}
            </Typography>
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
