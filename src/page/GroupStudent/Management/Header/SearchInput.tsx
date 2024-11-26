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
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useParams from '@/hooks/ui/useParams';
const SEARCH_FIELD = {
  topicName: 'tên đề tài',
  lecturerName: 'giản viêng hướng dẫn',
  name: 'mã nhóm',
};

function SearchInput({ sx }: BoxProps) {
  const [sort, setSort] = useState('ASC');
  const [typeSearch, setTypeSearch] = useState('lecturerName');

  useEffect(() => {
    setTypeSort(sort);
    onTypeSearchChange(typeSearch);
  }, [sort, typeSearch]);

  const { onSearchChange, getQueryField, onTypeSearchChange, setTypeSort } = useParams();

  return (
    <Box sx={{ ...sx, display: 'flex', gap: 3, width: '100%' }}>
      <FormControl sx={{ width: 180, padding: 0 }}>
        <InputLabel size='small' id='search-type-label'>
          Cột tìm kiếm
        </InputLabel>
        <Select
          size='small'
          label='Cột tìm kiếm'
          labelId='search-type-label'
          id='search-type'
          value={typeSearch}
          defaultValue='topicName'
          onChange={(e) => setTypeSearch(e.target.value)}
        >
          <MenuItem value='topicName'>Tên đề tài</MenuItem>
          <MenuItem value='lecturerName'>Giảng viên HD</MenuItem>
          <MenuItem value='name'>Mã nhóm</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label={`Tìm kiếm theo ${SEARCH_FIELD[typeSearch]}`}
        variant='outlined'
        fullWidth
        defaultValue={getQueryField('keywords')}
        size='small'
        onChange={onSearchChange}
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
