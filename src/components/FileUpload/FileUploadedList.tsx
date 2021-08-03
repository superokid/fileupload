import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bytesToSize } from '../../utils/file';
import { ReduxState } from '../../store';
import {
  FileUploadedListItem,
  cancelPostFile,
} from '../../store/features/fileupload';
import ImgLoading from '../../assets/loading.gif';

interface Props {
  files?: FileUploadedListItem[];
}

const FileUploadedList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const files = useSelector<ReduxState, FileUploadedListItem[]>(
    (state) => state.fileupload.fileUploadedList
  );

  const handleCancel = (name: string) => () => {
    dispatch(cancelPostFile(name));
  };

  return (
    <div className="c-file-upload-list">
      {files.map((item) => (
        <div key={item.name} className="c-file-upload-list__item">
          <div className="c-file-upload-list__text">{item.name}</div>
          {item.status === 'loading' && (
            <img src={ImgLoading} alt="loading-icon" width="15" />
          )}
          <div className="c-file-upload-list__progress">
            {`${bytesToSize(item.progressCurrent)} / ${bytesToSize(
              item.progressTotal
            )}`}
          </div>
          <button onClick={handleCancel(item.name)}>cancel</button>
        </div>
      ))}
    </div>
  );
};

export default FileUploadedList;
