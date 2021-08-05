import React, { useState, useRef } from 'react';
import ImgIconFolder from '../../assets/folder.png';
import './FileUpload.css';

interface Props {
  accept?: string;
  multiple?: boolean;
  uploadedFile?: (files: FileList) => void;
}

const FileUpload: React.FC<Props> = ({ accept, multiple, uploadedFile }) => {
  const [uploadList, setUploadList] = useState<FileList>();
  const elFileInput = useRef<HTMLInputElement>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadList(e.target.files);
    }
  };

  const handleUpload = () => {
    if (uploadList) {
      setUploadList(undefined);
      if (uploadedFile) {
        uploadedFile(uploadList);
      }
      if (elFileInput.current) {
        elFileInput.current.value = '';
      }
    }
  };

  const renderFileName = (uploadList?: FileList) => {
    if (uploadList?.length) {
      const res: string[] = [];
      Object.values(uploadList).forEach((item) => {
        res.push(`"${item.name}"`);
      });
      return res.join(', ');
    }
    return (
      <span className="c-file-upload__placeholder--default">Select a file</span>
    );
  };

  return (
    <div className="c-file-upload">
      <label className="c-file-upload__label">
        <div className="c-file-upload__container">
          <div className="c-file-upload__placeholder">
            {renderFileName(uploadList)}
          </div>
          <input
            className="c-file-upload__input"
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleSelectFile}
            data-testid="fileInput"
            ref={elFileInput}
          />
        </div>
        <img
          className="c-file-upload__icon"
          src={ImgIconFolder}
          alt="upload-icon"
          width="20"
        />
      </label>
      <button className="c-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
