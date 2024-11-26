import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import Titlemanager from '@/components/ui/Title';
import CustomTextField from '@/components/ui/CustomTextField';
import ChipTag from '@/components/ui/Badge';
import { useEffect, useState } from 'react';
import useAnalysis from '@/hooks/api/useQueryAnalysis';
import { useSnackbar } from 'notistack';

type CategoryItemType = {
  name?: string;
  id?: string;
};
const convertCategories = (data: string[]): CategoryItemType[] => {
  if (!data || data === undefined) return [];
  return data?.map((item: string) => ({ name: item, id: item }));
};
function AnalysisPage() {
  //[API]
  const { onCreateEntitiesAnalysis, handleGetCategories } = useAnalysis();
  const { data: dataFetch } = handleGetCategories();
  //[HOOKS]
  const [categories, setCategories] = useState<CategoryItemType[]>([]);
  const [category, setCategory] = useState<String>();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setCategories(convertCategories(dataFetch?.keywords));
  }, []);

  //Event
  const onAnalysis = async () => {
    setLoading(true);
    const iSuccess = await onCreateEntitiesAnalysis(categories.map((i) => i.id));
    if (iSuccess === true) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const onEnterCategory = (e: any) => {
    const value = e.target.value;
    if (e.key === 'Enter') {
      setCategories((pre: any[]) => [...pre, { name: value, id: value }]);
      setCategory('');
    }
  };

  const removeCategory = (id: string) => {
    setCategories((pre) => pre.filter((cate) => cate.id !== id));
  };

  const removeAllCategories = () => {
    setCategories([]);
  };

  return (
    <Paper sx={{ px: 20, pt: 10, pb: 40 }}>
      <Titlemanager icon='quill:analytics'>
        Phân loại đề tài & Phân loại chuyên môn của giảng viên hướng dẫn
      </Titlemanager>
      <Box gap={4} display={'flex'} bgcolor={'grey.100'} borderRadius={4} px={20} py={10} mt={14}>
        <Box>
          <CustomTextField
            sx={{ bgcolor: 'white', width: 300 }}
            onKeyDown={(e) => onEnterCategory(e)}
            label='Nhập vào loại đề tài'
            placeholder='ví dụ: App'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <Typography variant='body1' color='grey.600'>
            Nhấn Enter để tạo
          </Typography>
        </Box>
        <Box ml={100}>
          <Typography variant='body1' color='grey.800'>
            Danh sách loại đề tài:
          </Typography>
          <>
            {categories?.length === 0 ? (
              <Box my={4} mx={10} fontSize={12}>
                chưa có loại đề tài...
              </Box>
            ) : (
              <Box my={4} px={10} py={4} borderRadius={4} border='2px solid rgb(230, 230, 230)'>
                {categories?.map((category) => (
                  <ChipTag
                    color='info'
                    label={category?.name}
                    sx={{ m: 2 }}
                    onDelete={() => removeCategory(category.id)}
                  />
                ))}
                <Button color='error' onClick={removeAllCategories}>
                  Reset tạo
                </Button>
              </Box>
            )}
          </>
        </Box>
      </Box>
      <Box mt={10}>
        <Typography variant='h6' fontWeight={'bold'}>
          Tiến hành Phân loại đề tài
        </Typography>
        <Typography variant='body1' color={'textSecondary'}>
          Quá trình có thể mất một vài phút
        </Typography>
        <Button
          onClick={() => onAnalysis()}
          disabled={categories?.length === 0}
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Bắt đầu phân tích
        </Button>
        <>{loading && <LinearProgress sx={{ mt: 4 }} />}</>
      </Box>
    </Paper>
  );
}

export default AnalysisPage;
