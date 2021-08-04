import React from 'react';
import { useDispatch } from 'react-redux';
import FileUpload from './components/FileUpload/FileUpload';
import FileUploadedList from './components/FileUpload/FileUploadedList';
import Spacing from './components/Spacing';
import { postFile } from './store/features/fileupload/action';

interface Props {}

const FileUploadWidget = (props: Props) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="mb-1">Files</div>
      <FileUpload
        multiple
        uploadedFile={(files) => {
          dispatch(postFile({ files }));
        }}
      />
      <Spacing size="50px" />
      <FileUploadedList />
    </>
  );
};

export default FileUploadWidget;
