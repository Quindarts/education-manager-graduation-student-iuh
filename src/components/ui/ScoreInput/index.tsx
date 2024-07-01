import useDebounce from '@/hooks/ui/useDebounce';
import { Box, Button, Checkbox, Paper, PaperProps, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ScoreInputPropsType extends PaperProps {
  name?: string;
  scoreMax: number;
  handleChangeTotalEvaluations: (score: number, id: string) => void;
  handleChangeCurrentTranscripts: (
    score: number,
    value: string,
    transcriptId?: string,
    isExistOldScore?: boolean,
  ) => void;
  transcriptId?: string;
  isExist?: boolean;
  oldScore?: number;
  studentId: string;
  value: string;
}
function ScoreInput(props: ScoreInputPropsType) {
  const {
    name,
    scoreMax,
    handleChangeCurrentTranscripts,
    handleChangeTotalEvaluations,
    transcriptId,
    isExist,
    oldScore,
    value,
    studentId,
    ...rest
  } = props;
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
      handleChangeTotalEvaluations(parseInt(scoreInput), value);
    }
    setScore(scoreInput);
  };
  return (
    <Paper {...rest}>
      <>
        <Box display={'flex'} height={50} py={2} px={6} justifyContent={'space-between'}>
          <Box display={'flex'} width={900} gap={2}>
            <Typography color={'primary'} variant='body1'>
              {name}
            </Typography>
          </Box>
          <Box display={'flex'} width={500} justifyContent={'end'} gap={2}>
            <Box alignSelf={'end'}>
              <TextField
                sx={{
                  input: {
                    fontSize: 16,
                    width: 100,
                    color: '#3084E4',
                    fontWeight: 800,
                    textAlign: 'right',
                  },
                }}
                error={errorMess !== ''}
                helperText={errorMess}
                onChange={(e) => {
                  handleSetPoint(e.target.value);
                }}
                color='primary'
                size='medium'
                label='Điểm'
                variant='standard'
                value={score}
              />
            </Box>

            <Typography alignSelf={'end'} color={'primary'} fontWeight={700} variant='body1'>
              /{scoreMax}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} m={4} gap={4} justifyContent={'end'}>
          {isExist === true ? (
            <Button
              onClick={() =>
                handleChangeCurrentTranscripts(parseInt(score), value, transcriptId, isExist)
              }
              variant='contained'
              disabled={errorMess !== ''}
              size='small'
              color='primary'
            >
              Cap nhat
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleChangeCurrentTranscripts(parseInt(score), value, transcriptId, isExist)
              }
              variant='contained'
              disabled={errorMess !== ''}
              size='small'
              color='primary'
            >
              Chấm điểm
            </Button>
          )}
        </Box>
      </>
    </Paper>
  );
}

export default ScoreInput;
