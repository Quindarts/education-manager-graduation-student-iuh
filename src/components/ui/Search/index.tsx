import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useDebounce from '@/hooks/ui/useDebounce';
import CustomTextField from '../CustomTextField';
import { Box, CircularProgress } from '@mui/material';

const Search = (props: any) => {
  const { isApiLoading = true, typeSearch = '...' } = props;
  const [isLoading, setIsLoading] = useState(isApiLoading);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);


  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Box style={{ position: 'relative' }}>
          <Box>{isLoading === true ? <CircularProgress /> : null}</Box>
          <CustomTextField
            placeholder={`Tìm kiếm theo ${typeSearch}`}
            id='search'
            type='search-type'
            onChange={(e: any) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            type='reset'
            className={`h-cb search__clear ${searchValue !== '' ? 'active' : ''}`}
          >
            <Icon icon='pajamas:close-xs' />
            <span>CLEAR</span>
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default Search;
