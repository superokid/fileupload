import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bytesToSize } from '../../utils/file';
import { ReduxState } from '../../store';
import {
  FileUploadedListItem,
  cancelPostFile,
} from '../../store/features/fileupload';
import ImgLoading from '../../assets/loading.gif';
import ImgSuccess from '../../assets/check.png';

interface Props {
  files?: FileUploadedListItem[];
}

const FileUploadedList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const files = useSelector<ReduxState, FileUploadedListItem[]>(
    (state) => state.fileupload.fileUploadedList
  );

  const handleCancel = (name: string, uuid: string) => () => {
    dispatch(cancelPostFile(name, uuid));
  };

  if (!files.length) {
    return null;
  }

  return (
    <div className="c-file-upload-list">
      <div>Current uploads</div>
      {files.map((item) => (
        <div key={item.uuid} className="c-file-upload-list__item">
          <div className="c-file-upload-list__text">{item.name}</div>
          {item.status === 'loading' && (
            <img
              className="c-file-upload-list__icon"
              src={ImgLoading}
              alt="loading-icon"
              width="14"
            />
          )}
          {item.status === 'success' && (
            <img
              className="c-file-upload-list__icon"
              src={ImgSuccess}
              alt="done-icon"
              width="14"
            />
          )}
          <div className="c-file-upload-list__progress">
            {`${bytesToSize(item.progressCurrent)} / ${bytesToSize(
              item.progressTotal
            )}`}
          </div>
          <button onClick={handleCancel(item.name, item.uuid)}>
            {item.status === 'loading' ? 'cancel' : 'remove'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileUploadedList;
