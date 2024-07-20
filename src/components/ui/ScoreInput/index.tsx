import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ScoreInputPropsType {
  scoreMax?: number;
  handleChangeScore: (studenId?: string, score?: string, evaluationId?: string) => void;
  oldScore?: number;
  studentId?: string;
  evaluationId?: string;
}
function ScoreInput(props: ScoreInputPropsType) {
  const { scoreMax, evaluationId, handleChangeScore, studentId, oldScore } = props;
  const [errorMess, setErrorMess] = useState('');
  const [score, setScore] = useState(`${oldScore}`);

  useEffect(() => {
    setScore(`${oldScore}`);
  }, [oldScore]);

  const handleSetPoint = (scoreInput: string) => {
    const regex = /^\d+$/;
    if (scoreInput === '') {
      setErrorMess('Điểm không được bỏ trống');
    } else if (!regex.test(scoreInput)) {
      setErrorMess('Điểm phải là số nguyên dương');
    } else if (parseInt(scoreInput, 10) > scoreMax) {
      setErrorMess(`Điểm phải < ${scoreMax + 1}`);
    } else {
      setErrorMess('');
      handleChangeScore(studentId, scoreInput, evaluationId);
    }
    setScore(scoreInput);
  };
  return (
    <Box>
      <input
        style={{
          height: 24,
          padding: '2px 4px',
          width: 50,
          fontSize: 16,
        }}
        onChange={(e) => {
          handleSetPoint(e.target.value);
        }}
        value={score}
      />
      {errorMess !== '' && (
        <Typography variant='body1' fontSize={11} color='error.main'>
          {errorMess}
        </Typography>
      )}{' '}
    </Box>
  );
}

export default ScoreInput;
