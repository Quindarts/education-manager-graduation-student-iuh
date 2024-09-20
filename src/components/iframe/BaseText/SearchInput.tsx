import React, { useState, useMemo, useEffect } from 'react';
import {
  TextField,
  Box,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputProps,
  BoxProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchPropsType extends BoxProps {
  isClear?: boolean;
  handleSearchType: (value: string) => void;
  handleClearSearch: (isClear: boolean) => void;
  handleKeywords: (value: string) => void;
}
function SearchInput({
  sx,
  isClear,
  handleSearchType,
  handleClearSearch,
  handleKeywords,
}: SearchPropsType) {
  const [searchType, setSearchType] = useState('topicName');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    handleSearchType(searchType);
    handleClearSearch(false);
  }, [searchType]);

  useEffect(() => {
    handleKeywords(searchTerm);
    handleClearSearch(false);
  }, [searchTerm]);
  useEffect(() => {
    setSearchType('topicName');
    setSearchTerm('');
  }, [isClear]);
  return (
    <Box sx={{ ...sx, display: 'flex', gap: 3, marginTop: 4, mx: 4 }}>
      <FormControl sx={{ width: 200, padding: 0 }}>
        <InputLabel size='small' id='search-type-label'>
          Tìm kiếm theo
        </InputLabel>
        <Select
          size='small'
          labelId='search-type-label'
          id='search-type'
          value={searchType}
          label='Tìm kiếm theo'
          onChange={(e) => setSearchType(e.target.value)}
        >
          <MenuItem value='topicName'>Tên sinh viên</MenuItem>
          <MenuItem value='lecturerSupportName'>Giảng viên hướng dẫn</MenuItem>
          <MenuItem value='topicName'>Tên đề tài</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={`Tìm kiếm theo ${searchType === 'topicName' ? 'Tên đề tài' : 'Giảng viên hướng dẫn'}`}
        variant='outlined'
        fullWidth
        value={searchTerm}
        size='small'
        onChange={(e) => setSearchTerm(e.target.value)}
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
