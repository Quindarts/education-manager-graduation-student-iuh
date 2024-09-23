import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTopic } from '@/hooks/api/useQueryTopic';
import UpdateQuantityTopicModal from '../Modal/UpdateQuantityTopic';
import useSearch from '@/hooks/ui/useParams';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import SplitButton from '@/components/ui/SplitButton';
import ExportExcelButton from '@/components/ui/Export';

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
  const [openChangeQuantityModal, setOpenChangeQuantityModal] = useState(false);
  const handleCloseChangeQuantityModal = () => {
    setOpenChangeQuantityModal(false);
  };
  const handleOpenChangeQuantityModal = () => {
    setOpenChangeQuantityModal(true);
  };

  const { handleUiRender, handleGetTopicToExport } = useTopic();
  const currentRole = handleUiRender();
  const { onSearchChange, getQueryField, onTypeSearchChange, handleFocused, setTypeSort } =
    useSearch();

  const [sort, setSort] = useState('ASC');

  const optionSort = ['Tăng dần', 'Giảm dần'];
  const handleClick = (index: number) => {
    if (index === 0) setSort('ASC');
    else if (index === 1) setSort('DESC');
  };
  useEffect(() => {
    setTypeSort(sort);
  }, [sort]);
  const { data, isSuccess: successTopics, refetch } = handleGetTopicToExport();

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <Box display={'flex'} flexWrap={'wrap'} gap={2}>
        {currentRole.includes('all') && (
          <>
            <>
              <Box flex={1} display={'flex'} gap={0} width={''}>
                <Box display={'flex'} gap={2}>
                  <DropDown
                    value={
                      getQueryField('searchField') ? getQueryField('searchField') : 'lecturerName'
                    }
                    onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
                    options={SEARCH_DROP_VALUE}
                  />
                  <Box width={124}>
                    <SplitButton icon='bx:sort' options={optionSort} handleClick={handleClick} />
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  size='small'
                  defaultValue={getQueryField('keywords')}
                  onChange={onSearchChange}
                  onBlur={() => handleFocused(false)}
                  placeholder='Tim kiếm đề tài theo tên đề tài, tên giảng viên'
                />
              </Box>{' '}
            </>
            <>
              {successTopics && (
                <ExportExcelButton
                  data={data.topics}
                  entity='topic'
                  labelTooltip='Tải file excel gồm danh sách các đề tài'
                />
              )}
              <Tooltip
                onClick={handleOpenChangeQuantityModal}
                title='Cập nhật số lượng của toàn bộ đề tài'
              >
                <Button
                  sx={{ bgcolor: 'grey.800' }}
                  color='primary'
                  type='button'
                  size='small'
                  variant='contained'
                >
                  <Icon icon='uiw:setting' color='white' width={20} />
                </Button>
              </Tooltip>{' '}
            </>
          </>
        )}
        {currentRole.includes('crud') && (
          <Box
            width={currentRole.includes('all') ? 'auto' : '100%'}
            justifyContent={'end'}
            gap={2}
            display={'flex'}
          >
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
              labelToolTip='Thêm đề tài bằng file excel'
              entityUpload={TypeEntityUpload.TOPIC}
            />
          </Box>
        )}
        
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
      <UpdateQuantityTopicModal
        open={openChangeQuantityModal}
        onClose={handleCloseChangeQuantityModal}
      />
    </>
  );
}

export default React.memo(HeaderTopic);
