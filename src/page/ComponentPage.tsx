import TextEditor from '@/components/ui/TextEditor';
import ModalUpload from '@/components/ui/Upload';
import ProgressUpload from '@/components/ui/Upload';
import { useTopic } from '@/hooks/api/useQueryTopic';
import {
  createTopicByToken,
  getTopicsByLecturerByTerm,
  getTopicsByTermByMajor,
} from '@/services/apiTopic';
import { Icon } from '@iconify/react';
import { Box, Button, InputLabel, LinearProgress, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useMutation, useQueries } from 'react-query';
function ComponentPage() {
  // const queries = useQueries([
  //   { queryKey: ['lecturer', 1, 3], queryFn: () => getTopicsByTermByMajor(1, 3) },
  //   { queryKey: ['topics', 20018432, 1], queryFn: () => getTopicsByLecturerByTerm(20018432, 1) },
  // ]);

  // const [lecturer, topics] = queries;

  // const { onCreateTopicByToken, onUpdateTopicById } = useTopic();

  // const { mutate: mutateLogin } = onCreateTopicByToken();
  // const { mutate: mutateUpdate } = onUpdateTopicById(10, 20018432, 1);

  // const handleSubmit = () => {
  //   mutateLogin({
  //     name: 'abcccs',
  //     description: 'desc topic 2',
  //     quantityGroupMax: 2,
  //     standardOutput: 'standardOutput 2',
  //     requireInput: 'requireInput 2',
  //     target: 'target 2',
  //   });
  //   mutateUpdate({
  //     name: '44',
  //     description: 'desc topic 2',
  //     quantityGroupMax: 2,
  //     standardOutput: 'standardOutput 2',
  //     requireInput: 'requireInput 2',
  //     target: 'target 2',
  //   });
  // };

  return (
    <Paper elevation={3}>
      {/* <ProgressUpload /> */}
      {/* <Button onClick={handleSubmit}>clickme</Button> */}
    </Paper>
  );
}

export default ComponentPage;
