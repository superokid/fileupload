import {
  FileUploadActions,
  FileUploadState,
  POST_FILE,
  POST_FILE_PROGRESS,
  POST_FILE_CANCEL,
  TRIGGER_POST_FILE_CANCEL,
} from './type';

const INITIAL_STATE: FileUploadState = {
  fileUploadedList: [],
  cancelList: {},
};

const fileUploadReducer = (
  state = INITIAL_STATE,
  action: FileUploadActions | any
) => {
  switch (action.type) {
    case POST_FILE.success:
      return {
        ...state,
        fileUploadedList: [...action.payload, ...state.fileUploadedList],
      };
    case POST_FILE_PROGRESS.success:
      return {
        ...state,
        fileUploadedList: state.fileUploadedList.map((item) => {
          if (item.name === action.payload.name) {
            return {
              ...item,
              progressCurrent: action.payload.progressCurrent,
              progressTotal: action.payload.progressTotal,
              status: action.payload.status,
            };
          }
          return item;
        }),
      };
    case POST_FILE_CANCEL.success:
      return {
        ...state,
        cancelList: {
          ...state.cancelList,
          [action.payload.name]: action.payload.cancelFunc,
        },
      };
    case TRIGGER_POST_FILE_CANCEL.success:
      return {
        ...state,
        fileUploadedList: state.fileUploadedList.filter(
          (item) => item.name !== action.payload.name
        ),
      };
    default:
      return state;
  }
};

export default fileUploadReducer;
