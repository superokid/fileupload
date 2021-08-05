import { Dispatch } from 'redux';
import axios from 'axios';
import CustomToast from '../../../components/CustomToast';
import axiosInstance from '../../../services/axiosConfig';
import {
  POST_FILE,
  POST_FILE_PROGRESS,
  POST_FILE_CANCEL,
  TRIGGER_POST_FILE_CANCEL,
} from './type';
import { toast } from 'react-toastify';
import { ReduxState } from '../../index';
import { bytesToSize } from '../../../utils/file';

const CancelToken = axios.CancelToken;

export const postFile =
  ({ files }: { files: FileList }) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: POST_FILE.request });
    try {
      const uploadTime = new Date().getTime();
      dispatch({
        type: POST_FILE.success,
        payload: Object.values(files).map((file: File) => {
          return {
            uuid: uploadTime + file.name,
            name: file.name,
            status: 'loading',
            file: file,
            progressCurrent: 0,
            progressTotal: file.size,
            toast: toast(
              <CustomToast
                text="loading"
                subtitle={bytesToSize(file.size)}
                status="loading"
              />,
              {
                toastId: uploadTime + file.name,
              }
            ),
          };
        }),
      });

      const requests = Object.values(files).map((file) => {
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        return axiosInstance({
          url: '/fileupload',
          method: 'post',
          data: bodyFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: {
            loaded: number;
            total: number;
          }) => {
            const isFinished = progressEvent.loaded === progressEvent.total;
            const status = isFinished ? 'success' : 'loading';

            if (isFinished) {
              toast.update(uploadTime + file.name, {
                render: () => (
                  <CustomToast
                    text={file.name}
                    subtitle={bytesToSize(file.size)}
                    status={status}
                  />
                ),
              });
            }

            dispatch({
              type: POST_FILE_PROGRESS.success,
              payload: {
                uuid: uploadTime + file.name,
                name: file.name,
                progressCurrent: progressEvent.loaded,
                progressTotal: progressEvent.total,
                status,
              },
            });
          },
          cancelToken: new CancelToken(function executor(cancelFunc) {
            toast.update(uploadTime + file.name, {
              render: () => (
                <CustomToast
                  text={file.name}
                  subtitle={bytesToSize(file.size)}
                  status="loading"
                />
              ),
            });
            dispatch({
              type: POST_FILE_CANCEL.success,
              payload: {
                uuid: uploadTime + file.name,
                cancelFunc,
              },
            });
          }),
        });
      });
      await Promise.all(requests);
    } catch (err) {
      dispatch({ type: POST_FILE.error });
    }
  };

export const cancelPostFile =
  (name: string, uuid: string) =>
  async (dispatch: Dispatch, getState: () => ReduxState) => {
    dispatch({ type: TRIGGER_POST_FILE_CANCEL.request });
    try {
      const { cancelList, fileUploadedList } = getState().fileupload;

      const canceledFile = fileUploadedList.filter(
        (item) => item.uuid === uuid && item.status !== 'success'
      );

      if (canceledFile.length && canceledFile[0]?.uuid) {
        toast.update(canceledFile[0].uuid, {
          render: () => (
            <CustomToast
              text={name}
              subtitle={bytesToSize(canceledFile[0]?.file?.size)}
              status="error"
            />
          ),
        });
        cancelList[canceledFile[0].uuid]();
      }

      dispatch({
        type: TRIGGER_POST_FILE_CANCEL.success,
        payload: {
          uuid: uuid,
        },
      });
    } catch (err) {
      dispatch({ type: TRIGGER_POST_FILE_CANCEL.error });
    }
  };
