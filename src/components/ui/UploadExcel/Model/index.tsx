import { Box, BoxProps, Button } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { ExportExcelModel } from './EntityModel';

const HEADER_TYPE = {
  lecturers: [
    { header: 'Mã GV', key: 'Mã GV', width: 6 },
    { header: 'Họ và tên', key: 'Họ và tên', width: 32 },
    { header: 'Giới tính', key: 'Giới tính', width: 15 },
    { header: 'Số điện thoại', key: 'Số điện thoại', width: 25 },
    { header: 'Email', key: 'Email', width: 40 },
  ],
  topics: [
    { header: 'Mã GV', key: 'Mã GV', width: 40 },
    { header: 'Tên GV', key: 'Tên GV', width: 40 },
    { header: 'Tên đề tài', key: 'Tên đề tài', width: 40 },
    { header: 'Mục tiêu đề tài', key: 'Mục tiêu đề tài', width: 40 },
    {
      header: 'Dự kiến sản phẩm nghiên cứu của đề tài và khả năng ứng dụng',
      key: 'Dự kiến sản phẩm nghiên cứu của đề tài và khả năng ứng dụng',
      width: 40,
    },
    { header: 'Mô tả', key: 'Mô tả', width: 40 },
    { header: 'Yêu cầu đầu vào', key: 'Yêu cầu đầu vào', width: 40 },
    { header: 'Yêu cầu đầu ra', key: 'Yêu cầu đầu ra', width: 40 },
    { header: 'Từ khóa', key: 'Từ khoá', width: 30 },
  ],
  students: [
    { header: 'Mã SV', key: 'Mã SV', width: 15 },
    { header: 'Họ đệm', key: 'Họ đệm', width: 20 },
    { header: 'Tên', key: 'Tên', width: 20 },
    { header: 'Giới tính', key: 'Giới tính', width: 10 },
    { header: 'Ngày sinh', key: 'Ngày sinh', width: 30 },
    { header: 'Lớp học', key: 'Lớp học', width: 15 },
  ],
};

interface ExportExcelModelButtonPropsType extends BoxProps {
  entityName: TypeEntityUpload;
  fileName: string;
  sheetName: string;
  title: string;
}

function ExportExcelModelButton({
  entityName,
  fileName,
  sheetName,
  title,
  sx,
}: ExportExcelModelButtonPropsType) {
  const exportModel = new ExportExcelModel(fileName, sheetName, HEADER_TYPE[entityName]);
  const onClick = () => {
    exportModel.setData([]);
    exportModel.onExport();
  };
  return (
    <Box sx={{ ...sx }}>
      <Button onClick={onClick}>
        <Icon width={20} icon={'vscode-icons:file-type-excel'} />
        {title}
      </Button>
    </Box>
  );
}

export default ExportExcelModelButton;
