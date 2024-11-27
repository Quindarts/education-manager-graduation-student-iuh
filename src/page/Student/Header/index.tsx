import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/UploadExcel';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useMajor } from '@/hooks/api/useQueryMajor';
import useSearch from '@/hooks/ui/useParams';
import SplitButton from '@/components/ui/SplitButton';
import { useStudent } from '@/hooks/api/useQueryStudent';
import ExportExcelButton from '@/components/ui/Export';
import LockAccountModal from '../Modal/LockAccountModal';
const SEARCH_DROP_VALUE = [
  {
    _id: 'full_name',
    name: 'Họ tên sinh viên',
  },
  {
    _id: 'username',
    name: 'Mã Sinh viên',
  },
  {
    _id: 'email',
    name: 'Email',
  },
];
function HeaderStudent() {
  const { majorStore } = useMajor();

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const [openLockStudents, setOpenLockStudents] = useState(false);
  const handleCloseLockModal = () => {
    setOpenLockStudents(false);
  };
  const handleOpenLockModal = () => {
    setOpenLockStudents(true);
  };

  const { onSearchChange, getQueryField, onTypeSearchChange, setTypeSort, setDefaultTypeSearch } =
    useSearch();

  useLayoutEffect(() => {
    if (getQueryField('searchField').length === 0) setDefaultTypeSearch('full_name');
  }, []);

  const [sort, setSort] = useState('ASC');
  const optionSort = ['Tăng dần', 'Giảm dần'];

  const handleClick = (index: number) => {
    if (index === 0) setSort('ASC');
    else if (index === 1) setSort('DESC');
  };

  useEffect(() => {
    setTypeSort(sort);
  }, [sort]);
  const { handleGetStudentsToExport, handleGetExportDemonstrateStudentScore } = useStudent();
  const { data, isSuccess: successStudents, refetch } = handleGetStudentsToExport();
  const { data: fetchDemoScore, isSuccess: successDemoScore } =
    handleGetExportDemonstrateStudentScore();

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
            placeholder='Tim kiếm sinh viên theo..'
          />
        </Box>

        <Tooltip onClick={handleOpenModal} title='Thêm sinh viên'>
          <Button size='small' color='error' type='button' variant='contained'>
            <Icon icon='lets-icons:add-round' width={20} />
          </Button>
        </Tooltip>
        <ModalUpload
          label=''
          labelToolTip='Thêm sinh viên bằng file excel'
          entityUpload={TypeEntityUpload.STUDENT}
          majorId={majorStore.currentMajor.id}
          fileNameModel='Mẫu file excel danh sách sinh viên KLTN'
          sheetName='Danh sách sinh viên KLTN'
          title='Tải xuống mẫu file'
        />
        {successStudents && (
          <ExportExcelButton
            data={data.students}
            entity='student'
            labelTooltip='Tải danh sách sinh viên'
          />
        )}
        {successDemoScore && (
          <ExportExcelButton
            data={fetchDemoScore?.students}
            entity='demoScoreStudents'
            labelTooltip='Xuất mẫu điểm sinh viên'
          />
        )}
        <Tooltip onClick={handleOpenLockModal} title='Khóa tài khoản toàn bộ sinh viên'>
          <Button size='small' color='primary' type='button' variant='contained'>
            <Icon icon='ic:sharp-lock' width={20} />
          </Button>
        </Tooltip>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
      <LockAccountModal open={openLockStudents} onClose={handleCloseLockModal} />
    </>
  );
}

export default React.memo(HeaderStudent);
