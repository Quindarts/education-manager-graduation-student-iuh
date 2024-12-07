import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ScoreInputPropsType {
  scoreMax?: number;
  handleChangeScore?: (studenId?: string, score?: string, evaluationId?: string) => void;
  oldScore?: number;
  studentId?: string;
  evaluationId?: string;
  disabled?: boolean;
}
function ScoreInput(props: ScoreInputPropsType) {
  const {
    scoreMax,
    evaluationId,
    handleChangeScore,
    disabled = false,
    studentId,
    oldScore,
  } = props;
  const [errorMess, setErrorMess] = useState('');
  const [score, setScore] = useState(`${oldScore}`);
  useEffect(() => {
    setScore(`${oldScore}`);
  }, [oldScore]);

  const handleSetPoint = (scoreInput: string) => {
    const regex = /^\d+$/;
    if (scoreInput === '') {
      setErrorMess('Không bỏ trống');
    } else if (!regex.test(scoreInput)) {
      setErrorMess('Điểm phải là số nguyên dương');
    } else if (parseInt(scoreInput, 10) > scoreMax) {
      setErrorMess(`Điểm  <= ${scoreMax}`);
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
          height: 30,
          padding: '2px 4px',
          width: 50,
          fontSize: 14,
          color: 'green',
          borderRadius: 2,
          textAlign: 'center',
          outline: 'none',
          borderBottom: '1px solid #a3a3a3',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
        }}
        onChange={(e) => {
          handleSetPoint(e.target.value);
        }}
        disabled={disabled}
        value={score}
      />
      {errorMess !== '' && (
        <Typography variant='body1' textAlign={'center'} fontSize={10} color='error.main'>
          {errorMess}
        </Typography>
      )}{' '}
    </Box>
  );
}

export default ScoreInput;
