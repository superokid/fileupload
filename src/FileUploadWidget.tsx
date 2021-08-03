import React from 'react';
import { useDispatch } from 'react-redux';
import FileUpload from './components/FileUpload/FileUpload';
import FileUploadedList from './components/FileUpload/FileUploadedList';
import { postFile } from './store/features/fileupload/action';

interface Props {}

const FileUploadWidget = (props: Props) => {
  const dispatch = useDispatch();

  return (
    <>
      <FileUpload
        multiple
        uploadedFile={(files) => {
          dispatch(postFile({ files }));
        }}
      />
      <FileUploadedList />
    </>
  );
};

export default FileUploadWidget;
