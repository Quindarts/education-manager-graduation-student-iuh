import { Avatar, Box, Button, Skeleton, Typography } from '@mui/material';
import TableManagerReviewScore from './Table';
import { useEffect, useState } from 'react';
import UploadFileExcel from '@/components/ui/Upload';
import { Evaluate } from '@/types/entities/evaluate';
import Table from '@/components/ui/Table/Table';

function ReviewManagerPage() {
  const [currentData, setCurrentData] = useState([]);
  let colScore: number[] = [];
  let colTitle: string[] = [];
  let colSTT: number[] = [];
  const listEvaluation: Evaluate[] = [];
  const [rows, setRows] = useState<Evaluate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    currentData.slice(1).forEach((item: any) => {
      if (typeof item[1] === 'string' && colTitle.length < 7) {
        colTitle.push(item[1]);
      } else if (typeof item[6] === 'number' && colScore.length < 7) {
        colScore.push(item[6]);
      } else if (typeof item[0] === 'number' && colSTT.length < 7) {
        colSTT.push(item[0]);
      }
    });
    if (colTitle.length > 0 && colScore.length > 0) {
      for (let i = 0; i < 7; i++) {
        var currentEval: Evaluate = {
          name: colTitle[i],
          id: i + 1,
          description: 'Đang cập nhật sau...',
          gradeMax: colScore[i],
          termId: 0,
          type: 'ADVISOR',
        };
        listEvaluation.push(currentEval);
      }
      setRows(listEvaluation);
      setIsLoading(false);
    }
  }, [currentData]);
  return (
    <Box>
      <Box my={4} display={'flex'} gap={6}>
        <UploadFileExcel setCurrentData={setCurrentData} />
        <Button variant='contained' color='warning'>
          Xuất phiếu chấm
        </Button>
        <Button variant='contained' color='error'>
          Xóa nhiều tiêu chí
        </Button>
        <Button variant='contained' color='success'>
          Lưu
        </Button>
      </Box>
      {isLoading ? (
        <Box>
          <Skeleton animation='wave'>
            <Box></Box>
          </Skeleton>
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Typography color='primary.main' variant='h6'>
            Chưa có dữ liệu, cần tải lên file Excel ...
          </Typography>
        </Box>
      ) : (
        <Box mt={8}>
          <TableManagerReviewScore rows={rows} />
        </Box>
      )}
    </Box>
  );
}

export default ReviewManagerPage;
