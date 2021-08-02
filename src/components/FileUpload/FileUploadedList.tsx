import React from 'react';
import { FileUploadedListItem } from './FileUpload';
import { bytesToSize } from '../../utils/file';
import { Cancel } from '../../services/api';

interface Props {
  files: FileUploadedListItem[];
  cancel?: Cancel;
}

const FileUploadedList: React.FC<Props> = ({ files, cancel }) => {
  const handleCancel = (name: string) => () => {
    if (cancel && cancel[name]) {
      cancel[name]();
    }
  };
  console.log(files);
  return (
    <div className="c-file-upload-list">
      {files.map((item) => (
        <div key={item.name} className="c-file-upload-list__item">
          <div className="c-file-upload-list__text">{item.name}</div>
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
