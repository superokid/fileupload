import React from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import FileUploadedList from './components/FileUpload/FileUploadedList';

interface Props {}

const FileUploadWidget = (props: Props) => {
  return (
    <FileUpload
      multiple
      render={(files) => {
        return <FileUploadedList files={files} />;
      }}
    ></FileUpload>
  );
};

export default FileUploadWidget;
