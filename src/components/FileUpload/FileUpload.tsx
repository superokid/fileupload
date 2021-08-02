import React, { useState } from 'react';
import './FileUpload.css';

export interface FileUploadedListItem {
  id?: number | string;
  name: string;
  status: 'loading' | 'done';
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

  const getFileName = (uploadList?: FileList) => {
    if (uploadList?.length) {
      return Object.values(uploadList).reduce((acc, curr) => {
        return acc + curr.name;
      }, '');
    }
    return 'Select a file';
  };

  return (
    <div className="c-file-upload">
      <label>
        <div>{getFileName(uploadList)}</div>
        <input
          className="c-file-upload__input"
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleSelectFile}
          data-testid="fileInput"
        />
      </label>
      <button onClick={handleUpload}>Upload</button>
      {render && render(uploadedFileList)}
    </div>
  );
};

export default FileUpload;
