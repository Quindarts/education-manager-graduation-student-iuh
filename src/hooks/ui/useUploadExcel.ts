import { bytesForHuman } from '@/components/ui/Upload/func';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import axiosConfig from '@/services/axiosConfig';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import axios, { AxiosProgressEvent } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { QueryKeysLecturer } from '../api/useQueryLecturer';

const EXTENSIONS = ['xlsx', 'xls', 'csv'];

export enum TypeEntityUpload {
  STUDENT = "students",
  LECTURER = 'lecturers',
  TOPIC = 'topics',
  EVALUATION = 'evaluations',
}

const axiosUpload = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
})

axiosUpload.interceptors.request.use(
  (config) => {
    const accessToken = getValueFromLocalStorage("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosUpload.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    // const accessToken = getValueFromLocalStorage("accessToken");
    if (error.response.data.status === 401 && error.response.data.success === false) {
      originalRequest._retry = true;
      try {
        const refreshToken = getValueFromLocalStorage("refreshToken");
        const result: any = await axiosConfig.post('/api/v1/lecturers/refresh-token', {
          refreshToken,
        });
        localStorage.setItem('accessToken', JSON.stringify(result.accessToken));
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return axiosConfig(originalRequest);

      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error.response.data);
  },
);

const useUploadExcel = (entityUpload: TypeEntityUpload, termId: string | number) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [totalSize, setTotalSize] = useState<string>('');
  const [currentFile, setCurrentFile] = useState()
  const { enqueueSnackbar } = useSnackbar();
  //axios
  const [valueLoading, setValueLoading] = useState<any>(0)
  const [dataResult, setDataResult] = useState()

  const getExention = (file: any) => {
    const parts = file.name.split('.');
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const importExcel = async (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setTotalSize(bytesForHuman(file.size));
    const reader = new FileReader();
    setSuccess(false);
    setLoading(true);

    if (file) {
      setCurrentFile(file)
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        enqueueSnackbar('File tải lên không đúng định dạng Excel, CSV file', {
          variant: 'error',
        });
      }
    } else {
      enqueueSnackbar('Đã có lỗi khi tải lên, vui lòng thử lại sau...', {
        variant: 'error',
      });
    }


  };
  const savedFileToDatabase = async (file: any) => {
    return axiosUpload.post(`http://localhost:3000/api/v1/${entityUpload}/import`, {
      file: file,
      termId: termId,
      majorId: 3,
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        setValueLoading(progressEvent.progress)
      }
    })
      .then(async function (response: any) {
        if (response.success) {
          enqueueSnackbar('Lưu danh sách giảng viên từ excel file thành công', {
            variant: 'success',
          });
          setDataResult(response.lecturer)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  return { importExcel, setFileName, setTotalSize, setCurrentFile, setValueLoading, savedFileToDatabase, currentFile, success, loading, fileName, valueLoading, totalSize };
};
export default useUploadExcel;
