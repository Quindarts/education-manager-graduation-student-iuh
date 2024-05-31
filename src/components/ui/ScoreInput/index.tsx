import { Box, Checkbox, Paper, PaperProps, TextField, Typography } from '@mui/material';

interface ScoreInputPropsType extends PaperProps {
  name: string;
  scoreMax: number | string;
}
function ScoreInput(props: ScoreInputPropsType) {
  const { name, scoreMax, ...rest } = props;
  return (
    <Paper {...rest}>
      <Box display={'flex'} py={2} px={4} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <Typography color={'primary'} variant='body2'>
            {name}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <TextField
            sx={{
              input: {
                fontSize: 18,
                width: 100,
                color: 'red',
                fontWeight: 600,
                textAlign: 'right',
              },
            }}
            color='error'
            size='medium'
            label='Điểm'
            variant='standard'
          />

          <Typography alignSelf={'end'} color={'error'} fontWeight={800} variant='h6'>
            /{scoreMax}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default ScoreInput;
