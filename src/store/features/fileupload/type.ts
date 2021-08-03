import { AxiosRequestConfig, Canceler } from 'axios';
import { FileUploadedListItem as FileUploaded } from '../../../components/FileUpload/FileUpload';
import actionTypeGenerator from '../../../utils/actionTypeGenerator';

export const POST_FILE = actionTypeGenerator('fileupload/POST_FILE');
export const POST_FILE_PROGRESS = actionTypeGenerator(
  'fileupload/POST_FILE_PROGRESS'
);
export const POST_FILE_CANCEL = actionTypeGenerator(
  'fileupload/POST_FILE_CANCEL'
);
export const TRIGGER_POST_FILE_CANCEL = actionTypeGenerator(
  'fileupload/TRIGGER_POST_FILE_CANCEL'
);

export type FileUploadedListItem = FileUploaded;
export type CancelList = { [key: string]: Canceler };

export interface FileUploadState {
  fileUploadedList: FileUploadedListItem[];
  cancelList: CancelList;
}

export interface PostFilesParams {
  files: FileList;
  config: AxiosRequestConfig;
}

interface PostFileAction {
  type: typeof POST_FILE.success;
  payload: FileUploadedListItem[];
}

interface PostFileProgressAction {
  type: typeof POST_FILE_PROGRESS.success;
  payload: {
    name: string;
    progressCurrent: number;
    progressTotal: number;
    status: 'loading' | 'success';
  };
}

interface PostFileCancelAction {
  type: typeof POST_FILE_CANCEL.success;
  payload: {
    name: string;
    cancelFunc: Canceler;
  };
}

export type FileUploadActions =
  | PostFileAction
  | PostFileProgressAction
  | PostFileCancelAction;
