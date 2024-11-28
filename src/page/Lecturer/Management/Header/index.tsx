import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AddLecturerModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/UploadExcel';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useSearch from '@/hooks/ui/useParams';

import { ENUM_RENDER_LECTURER } from '@/store/slice/lecturer.slice';
import SplitButton from '@/components/ui/SplitButton';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import ExportExcelButton from '@/components/ui/Export';

const SEARCH_DROP_VALUE = [
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_FULLNAME,
    name: 'Họ tên giảng viên',
  },
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_USERNAME,
    name: 'Mã giảng viên',
  },
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_PHONE,
    name: 'Số điện thoại',
  },
  {
    _id: ENUM_RENDER_LECTURER.SEARCH_EMAIL,
    name: 'Email',
  },
];

function HeaderLecturer() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { onSearchChange, getQueryField, onTypeSearchChange, setTypeSort } = useSearch();

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const { termStore } = useTerm();
  const { currentTerm } = termStore;
  const [sort, setSort] = useState('ASC');
  const optionSort = ['Tăng dần', 'Giảm dần'];
  const handleClick = (index: number) => {
    if (index === 0) setSort('ASC');
    else if (index === 1) setSort('DESC');
  };
  useEffect(() => {
    setTypeSort(sort);
  }, [sort]);
  const { handleGetLecturerToExport } = useLecturer();
  const { data, isSuccess: successLecturer, refetch } = handleGetLecturerToExport();

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box flex={1} display={'flex'} gap={2} width={'full'}>
          <Box display={'flex'} gap={2}>
            <DropDown
              value={getQueryField('searchField') ? getQueryField('searchField') : 'full_name'}
              onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
              options={SEARCH_DROP_VALUE}
            />
            <Box width={110}>
              <SplitButton icon='bx:sort' options={optionSort} handleClick={handleClick} />
            </Box>
          </Box>
          <TextField
            fullWidth
            size='small'
            defaultValue={getQueryField('keywords')}
            onChange={onSearchChange}
            placeholder='Tim kiếm giảng viên theo..'
          />
        </Box>
        <Tooltip
          title='
          Thêm Giảng viên
        '
        >
          <Button
            size='small'
            color='error'
            type='button'
            onClick={handleOpenModal}
            variant='contained'
          >
            <Icon icon='lets-icons:add-round' width={20} />
          </Button>
        </Tooltip>

        <ModalUpload
          label=''
          labelToolTip='Thêm đề tài bằng file excel'
          entityUpload={TypeEntityUpload.LECTURER}
          termId={currentTerm.id}
          fileNameModel='Mẫu file excel danh sách giảng viên KLTN'
          sheetName='Danh sách giảng viên KLTN'
          title='Tải xuống mẫu file'
        />
        {successLecturer && (
          <ExportExcelButton
            data={data.lecturers}
            entity='lecturer'
            labelTooltip='Tải danh sách giảng viên'
          />
        )}
      </Box>
      <AddLecturerModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default React.memo(HeaderLecturer);
