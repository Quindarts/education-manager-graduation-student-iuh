import useDebounce from '@/hooks/ui/useDebounce';
import { Icon } from '@iconify/react';
import { Box, Button, Checkbox, Paper, PaperProps, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ScoreInputPropsType extends PaperProps {
  name?: string;
  scoreMax: number;
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
  widthInput?: number;
}
function ScoreInput(props: ScoreInputPropsType) {
  const {
    name,
    numberCLO,
    scoreMax,
    handleChangeCurrentTranscripts,
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
    }
    setScore(scoreInput);
  };
  return (
    <Paper {...rest}>
      <>
        <Box display={'flex'} height={100} py={2} px={6} justifyContent={'space-between'}>
          <Box display={'flex'} width={900} gap={2}>
            <Typography mt={5} color={'primary'} fontWeight={500} variant='body1'>
              CLO{numberCLO}. {'   '}
              {name}
            </Typography>
          </Box>
          <Box display={'flex'} width={500} justifyContent={'end'} gap={2}>
            <Box alignSelf={'end'}>
              <TextField
                sx={{
                  input: {
                    fontSize: 18,
                    width: '100px',
                    color: '#e43030',
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
        {/* <Box display={'flex'} m={4} gap={4} justifyContent={'end'}>
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
              <Icon icon='ep:edit-pen' />
              Cập nhật Điểm số
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
              <Icon icon='mdi:pen-add' />
              Chấm điểm
            </Button>
          )}
        </Box> */}
      </>
    </Paper>
  );
}

export default ScoreInput;
