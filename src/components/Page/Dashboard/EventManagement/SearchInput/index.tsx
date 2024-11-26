import { TextField, Box, InputAdornment, BoxProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchType extends BoxProps {
  changeSearch: (s: string) => void;
  keywords: string;
}
function SearchInput({ sx, changeSearch, keywords }: SearchType) {
  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <TextField
        label={`Tìm kiếm theo tên đề tài `}
        variant='outlined'
        fullWidth
        defaultValue={keywords}
        size='small'
        onChange={(e) => changeSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ color: 'primary.dark' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchInput;
