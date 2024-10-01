import { Icon } from '@iconify/react';
import { Box, Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTopic } from '@/hooks/api/useQueryTopic';
import useSearch from '@/hooks/ui/useParams';
import ExportExcelButton from '@/components/ui/Export';
import AddModal from '@/components/Page/Topic/Modal/AddModal';
import SearchInput from './SearchInput';

const SEARCH_DROP_VALUE = [
  {
    name: 'Tên Đề tài',
    _id: 'name',
  },
  {
    name: 'Tên Giảng viên HD',
    _id: 'lecturerName',
  },
];
function HeaderTopic() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const { handleGetTopicLecturerToExport } = useTopic();
  const { onSearchChange, getQueryField, onTypeSearchChange, handleFocused, setTypeSort } =
    useSearch();
  const [sort, setSort] = useState('ASC');

  useEffect(() => {
    setTypeSort(sort);
  }, [sort]);
  const { data, refetch } = handleGetTopicLecturerToExport();

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <Box display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box width={'100%'} justifyContent={'end'} gap={2} display={'flex'}>
          <SearchInput />
          <Tooltip onClick={handleOpenModal} title='Thêm đề tài'>
            <Button
              onClick={handleOpenModal}
              size='small'
              color='error'
              type='button'
              variant='contained'
            >
              <Icon icon='lets-icons:add-round' width={20} />
            </Button>
          </Tooltip>
          <ModalUpload
            label=''
            fileNameModel='Mẫu file import danh sách đề tài KLTN '
            sheetName='sheet1'
            title={'Tải xuống mẫu file'}
            labelToolTip='Thêm đề tài bằng file excel'
            entityUpload={TypeEntityUpload.TOPIC}
          />
          <ExportExcelButton
            data={data?.topics}
            entity='topic'
            labelTooltip='Tải file excel gồm danh sách các đề tài'
          />
        </Box>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderTopic;
