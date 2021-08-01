import React from 'react';
import { FileUploadedListItem } from './FileUpload';
import { bytesToSize } from '../../utils/file';

interface Props {
  files: FileUploadedListItem[];
}

const FileUploadedList: React.FC<Props> = ({ files }) => {
  return (
    <div className="c-file-upload-list">
      {files.map((item, i) => (
        <div key={i} className="c-file-upload-list__item">
          <div className="c-file-upload-list__text">{item.name}</div>
          <div className="c-file-upload-list__progress">
            {`${bytesToSize(item.progress.current)} / ${bytesToSize(
              item.progress.total
            )}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUploadedList;
