import * as React from 'react';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

export default function GlobalLoading() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{ position: 'fixed', zIndex: 1000, left: 0, right: 0, top: 0, width: '100%', height: 30 }}
    >
      <LinearProgress value={progress} />
    </Box>
  );
}
