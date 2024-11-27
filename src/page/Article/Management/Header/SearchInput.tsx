import React, { useState, useMemo, useEffect } from 'react';
import {
  TextField,
  Box,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  BoxProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useParams from '@/hooks/ui/useParams';
const SEARCH_FIELD = {
  name: 'tên bài báo',
};

function SearchInput({ sx }: BoxProps) {
  const [sort, setSort] = useState('ASC');
  const [typeSearch, setTypeSearch] = useState('name');

  useEffect(() => {
    setTypeSort(sort);
    onTypeSearchChange(typeSearch);
  }, [sort, typeSearch]);

  const { onSearchChange, getQueryField, onTypeSearchChange, setTypeSort } = useParams();

  return (
    <Box sx={{ ...sx, display: 'flex', gap: 3, width: '100%' }}>
      <FormControl sx={{ width: 180, padding: 0 }}>
        <Select
          size='small'
          labelId='search-type-label'
          id='search-type'
          value={typeSearch}
          defaultValue='name'
          onChange={(e) => setTypeSearch(e.target.value)}
        >
          <MenuItem value='name'>Tên bài báo</MenuItem>
        </Select>
      </FormControl>

      <TextField
        variant='outlined'
        fullWidth
        defaultValue={getQueryField('keywords')}
        size='small'
        onChange={onSearchChange} 
        placeholder='Nhập tên bài báo'
        InputProps={{
          startAdornment: (
            <InputAdornment  position='start'>
              <SearchIcon sx={{ color: 'primary.dark' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchInput;
