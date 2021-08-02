import axios, { Canceler } from 'axios';
import axiosInstance from './axiosConfig';
const CancelToken = axios.CancelToken;

export type Progress = { [key: string]: number };
export type Cancel = { [key: string]: Canceler };
export type CancelList = (cancel: Cancel) => void;
export type UploadProgress = (progress: Progress) => void;

export const postFiles = (
  files: FileList,
  uploadProgress: UploadProgress,
  cancelList: (cancelName: string, cancel: Canceler) => void
) => {
  const requests = Object.values(files).map((file) => {
    const progress: Progress = {};
    const cancel: Cancel = {};

    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return axiosInstance({
      url: '/fileupload',
      method: 'post',
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: { loaded: number; total: number }) => {
        // const percent = Math.floor(
        //   (progressEvent.loaded / progressEvent.total) * 100
        // );
        progress[file.name] = progressEvent.loaded;
        uploadProgress(progress);
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        // cancel[file.name] = c;
        cancelList(file.name, c);
      }),
    });
  });
  return Promise.all(requests);
};
