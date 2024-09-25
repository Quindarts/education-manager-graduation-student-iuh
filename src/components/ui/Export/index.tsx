import useExportExcel from '@/hooks/ui/useExportExcel';
import { Icon } from '@iconify/react';
import { Box, Button, Checkbox, FormControlLabel, Paper, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import TitleManager from '../Title';
import CustomTextField from '../CustomTextField';
import { stripHtmlTags } from '@/utils/convertHtmlText';
import { useTerm } from '@/hooks/api/useQueryTerm';

const HEADER_TYPE = {
  lecturer: [
    { header: 'STT', key: 'STT', width: 6 },
    { header: 'Mã GV', key: 'Mã GV', width: 15 },
    { header: 'Họ và tên', key: 'Họ và tên', width: 32 },
    { header: 'Giới tính', key: 'Giới tính', width: 15 },
    { header: 'Số điện thoại', key: 'Số điện thoại', width: 25 },
    { header: 'Email', key: 'Email', width: 40 },
  ],
  lecturerTerm: [
    { header: 'Mã GV', key: 'Mã GV', width: 15 },
    { header: 'Tên GV', key: 'Tên GV', width: 16 },
  ],
  topic: [
    { header: 'STT', key: 'STT', width: 6 },
    { header: 'Mã GV', key: 'Mã GV', width: 15 },
    { header: 'Tên GV', key: 'Tên GV', width: 18 },
    { header: 'Tên đề tài', key: 'Tên đề tài', width: 32 },
    { header: 'Mô tả', key: 'Mô tả', width: 40 },
    { header: 'Mục tiêu đề tài', key: 'Mục tiêu đề tài', width: 40 },
    {
      header: 'Dự kiến sản phẩm nghiên cứu của đề tài và khả năng ứng dụng',
      key: 'Dự kiến sản phẩm nghiên cứu của đề tài và khả năng ứng dụng',
      width: 50,
    },
    { header: 'Yêu cầu đầu vào', key: 'Yêu cầu đầu vào', width: 40 },
    { header: 'Yêu cầu đầu ra', key: 'Yêu cầu đầu ra', width: 40 },
  ],
  student: [
    { header: 'STT', key: 'STT', width: 6 },
    { header: 'Mã SV', key: 'Mã SV', width: 15 },
    { header: 'Họ và tên', key: 'Họ và tên', width: 40 },
    { header: 'Giới tính', key: 'Giới tính', width: 10 },
    { header: 'Ngày sinh', key: 'Ngày sinh', width: 30 },
    { header: 'Email', key: 'Email', width: 40 },
    { header: 'Lớp học', key: 'Lớp học', width: 15 },
    { header: 'Số điện thoại', key: 'Số điện thoại', width: 15 },
  ],
  groupStudent: [
    { header: 'STT', key: 'STT', width: 6 },
    { header: 'Mã nhóm', key: 'Mã nhóm', width: 12 },
    { header: 'Mã SV', key: 'Mã SV', width: 10 },
    { header: 'Họ tên SV', key: 'Họ tên SV', width: 20 },
    { header: 'GVHD', key: 'GVHD', width: 20 },
    { header: 'Mã đề tài', key: 'Mã đề tài', width: 10 },
    { header: 'Tên đề tài', key: 'Tên đề tài', width: 100 },
  ],
  assignGroup: [
    { header: 'Mã nhóm', key: 'Mã nhóm', width: 10 },
    { header: 'Mã SV', key: 'Mã SV', width: 12 },
    { header: 'Họ tên SV', key: 'Họ tên SV', width: 24 },
    { header: '#HĐPB', key: '#HĐPB', width: 22 },
    { header: 'Ghi chú', key: 'Ghi chú', width: 30 },
    { header: 'HD TV', key: 'HD TV', width: 40 },
    { header: 'STT', key: 'STT', width: 6 },
    { header: 'GVHD', key: 'GVHD', width: 20 },
  ],
};
interface ExportExcelPropsType {
  label?: string;
  labelTooltip?: string;
  entity: 'topic' | 'lecturer' | 'student' | 'lecturerTerm' | 'groupStudent' | 'assignGroup';
  data: any;
  disabled?: boolean;
}

const handleRowToSavedExcel = (data: any[], columnToSend: any[]) => {
  const rowDatasHavedSend = data?.map((row) => {
    let result = {};
    columnToSend
      .map((col) => col.key)
      ?.map((value) => {
        if (value in row) {
          result[value] = stripHtmlTags(row[value]);
        }
      });
    return result;
  });
  return rowDatasHavedSend;
};
const entityFileName = (entity: string, termName: string, majorName: string) => {
  let text = '';
  switch (entity) {
    case 'topic':
      text = 'Danh sách đề tài KLTN';
      break;
    case 'lecturer':
      text = 'Danh sách giảng viên chuyên ngành ' + majorName + ' KLTN';
      break;
    case 'lecturerTerm':
      text = 'Danh sách giảng viên hướng dẫn KLTN';
      break;
    case 'student':
      text = 'Danh sách sinh viên KLTN ';
      break;
    case 'groupStudent':
      text = 'Danh sách nhóm sinh viên đã chọn đề tài KLTN ';
      break;
    case 'assignGroup':
      text = 'Danh sách nhóm giảng viên phân công chấm KLTN';
  }
  return text + ' ' + termName;
};
function ExportExcelButton(props: ExportExcelPropsType) {
  const { label, labelTooltip, entity, data, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState<string>(``);
  const [sheetName, setSheetName] = useState<string>('sheet1');
  const { termStore } = useTerm();
  //hooks
  const exportService = useExportExcel();
  const [mappedCheckbox, setMappedCheckbox] = useState<any>();

  useEffect(() => {
    if (entity) {
      const convert = HEADER_TYPE[`${entity + ''}`].map((v: any) => {
        let obj = {};
        obj[`${v.key}`] = true;
        return obj;
      });
      setMappedCheckbox(convert);
    }
    setFileName(`${entityFileName(entity, termStore.currentTerm.name, '')}`);
  }, [isOpen, entity]);

  const toggleCheckBox = (key: string) => {
    let toggle_arr = mappedCheckbox.map((col: { string: boolean }) => {
      let currentKey = Object.keys(col)[0];
      if (currentKey === key) {
        col[currentKey] = !col[currentKey];
      }
      return col;
    });
    setMappedCheckbox(toggle_arr);
  };

  let handleSubmit = () => {
    const listKeyChecked = mappedCheckbox
      .filter((col: { string: boolean }) => col[Object.keys(col)[0]] === true)
      .map((col: { string: boolean }) => Object.keys(col)[0]);
    const columnHavedFilter = HEADER_TYPE[`${entity}`]
      .map((head: any) => {
        if (listKeyChecked.includes(head.key)) {
          return head;
        } else return null;
      })
      .filter((col) => col !== null);
    exportService.onExport(
      entity,
      fileName,
      sheetName,
      handleRowToSavedExcel(data, columnHavedFilter),
      columnHavedFilter,
    );
  };

  const onOpenModal = () => {
    setIsOpen(true);
  };
  const onCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Box>
      <Tooltip arrow title={labelTooltip}>
        <Button size='small' onClick={onOpenModal} variant='contained' color='success'>
          <Icon icon='mdi:file-download' width={24} />
          {label}
        </Button>
      </Tooltip>

      <Modal maxWidth={'md'} open={isOpen} onClose={onCloseModal}>
        <TitleManager mx={10} variant='h6' textTransform={'uppercase'} icon='uiw:file-excel'>
          Export file excel
        </TitleManager>
        <Paper
          sx={{
            p: 10,
          }}
          elevation={0}
        >
          <Box component={'section'}>
            <Box display={'flex'} gap={4}>
              <Box
                border={
                  mappedCheckbox?.filter((col) => col[Object.keys(col)[0]] === true).length !== 0
                    ? '1px solid white'
                    : '1px solid #c64c4c'
                }
                padding={4}
                bgcolor={'grey.50'}
                borderRadius={2}
                flex={2}
              >
                <Typography variant='h6' fontWeight={600} color='grey.800'>
                  Hiển thị các cột trong file:{' '}
                  {mappedCheckbox?.filter((col) => col[Object.keys(col)[0]] === true).length} cột
                </Typography>
                {mappedCheckbox?.filter((col) => col[Object.keys(col)[0]] === true).length ===
                  0 && (
                  <Typography variant='body1' color='error.dark'>
                    *Bạn phải chọn ít nhất 1 cột
                  </Typography>
                )}
                <Box mx={4}>
                  {mappedCheckbox &&
                    mappedCheckbox?.map((column: { string: boolean }, index: number) => (
                      <Typography variant='body1' color='initial'>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={column[Object.keys(column)[0]]}
                              disabled={disabled}
                              onChange={() => toggleCheckBox(Object.keys(column)[0])}
                            />
                          }
                          label={Object.keys(column)[0]}
                        />
                      </Typography>
                    ))}
                </Box>
              </Box>
              <Box flex={2}>
                <CustomTextField
                  value={fileName}
                  fullWidth
                  label='Tên file '
                  onChange={(e) => setFileName(e.target.value)}
                  required
                  helperText=''
                />
                <CustomTextField
                  onChange={(e) => setSheetName(e.target.value)}
                  label='Tên sheet'
                  value={sheetName}
                  required
                  helperText=''
                />
                <CustomTextField label='Định dạng file' disabled value={'.xlsx'} helperText='' />
              </Box>
            </Box>
          </Box>
          <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
            <Button
              disabled={
                mappedCheckbox?.filter((col) => col[Object.keys(col)[0]] === true).length === 0
              }
              variant='contained'
              onClick={handleSubmit}
              color='success'
            >
              <Icon icon='ri:file-excel-fill' width={20} />
              Tải file excel
            </Button>
            <Button variant='contained' color='primary' onClick={onCloseModal}>
              <Icon icon='mdi:close-outline' />
              Thoát
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}

export default ExportExcelButton;
