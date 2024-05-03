import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import * as XLSX from 'xlsx';

const EXTENSIONS = ['xlsx', 'xls', 'csv'];

const useUploadExcel = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState<Array<any>>([]);
  const [fileName, setFileName] = useState<string>('');
  const getExention = (file: any) => {
    const parts = file.name.split('.');
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const importExcel = (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    setSuccess(false);
    setLoading(true);
    reader.onload = (event: any) => {
      const bstr = event?.target?.result;
      const workBook = XLSX.read(bstr, { type: 'binary' });
      const workSheet = workBook.Sheets[`${workBook.SheetNames[0]}`];
      if (workSheet) {
        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        if (fileData) {
          setSuccess(true);
          setLoading(false);
          setData(fileData);
        }
      }
    };
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        enqueueSnackbar('File tải lên không đúng định dạng Excel, CSV file', {
          variant: 'error',
        });
      }
    } else {
      setData([]);
      enqueueSnackbar('Đã có lỗi khi tải lên, vui lòng thử lại sau...', {
        variant: 'error',
      });
    }
  };
  console.log('my data', data);
  return { importExcel, success, data, loading, fileName };
};
export default useUploadExcel;
