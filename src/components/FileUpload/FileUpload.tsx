import React, { useState } from 'react';
import ImgIconFolder from '../../assets/folder.png';
import './FileUpload.css';

export interface FileUploadedListItem {
  id?: number | string;
  name: string;
  status: 'loading' | 'success';
  progressCurrent: number;
  progressTotal: number;
  file: File;
}

interface Props {
  accept?: string;
  multiple?: boolean;
  uploadedFile?: (files: FileList) => void;
  render?: (files: FileUploadedListItem[]) => string | React.ReactNode;
}

const FileUpload: React.FC<Props> = ({
  accept,
  multiple,
  uploadedFile,
  render,
}) => {
  const [uploadList, setUploadList] = useState<FileList>();
  const [uploadedFileList, setUploadedFileList] = useState<
    FileUploadedListItem[]
  >([]);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadList(e.target.files);
    }
  };

  const handleUpload = () => {
    if (uploadList) {
      const newFile: FileUploadedListItem[] = Object.values(uploadList).map(
        (item) => {
          return {
            name: item.name,
            status: 'loading',
            file: item,
            progressCurrent: 0,
            progressTotal: item.size,
          };
        }
      );
      setUploadedFileList([...uploadedFileList, ...newFile]);
      setUploadList(undefined);
      if (uploadedFile) {
        uploadedFile(uploadList);
      }
    }
  };

  const renderFileName = (uploadList?: FileList) => {
    if (uploadList?.length) {
      return Object.values(uploadList).reduce((acc, curr) => {
        return acc + curr.name;
      }, '');
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
          />
        </div>
        <img className="c-file-upload__icon" src={ImgIconFolder} width="20" />
      </label>
      <button className="c-button" onClick={handleUpload}>
        Upload
      </button>
      {render && render(uploadedFileList)}
    </div>
  );
};

export default FileUpload;
