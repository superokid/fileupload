import React, { useState } from 'react';
import axios, { Canceler } from 'axios';
import FileUpload, {
  FileUploadedListItem,
} from './components/FileUpload/FileUpload';
import FileUploadedList from './components/FileUpload/FileUploadedList';
import { postFiles, Progress, Cancel } from './services/api';

interface Props {}

// const progress: Progress = {};
let cancel: Cancel = {};

const FileUploadWidget = (props: Props) => {
  const [progress, setProgress] = useState<Progress>({});
  // const [cancel, setCancel] = useState<Cancel>({});

  const uploadProgress = (currentProgress: Progress) => {
    setProgress({ ...progress, ...currentProgress });
    // progress[name] = currentProgress;
  };

  const cancelList = (cancelName: string, c: Canceler) => {
    // console.log(cancel, cancelName);
    // setCancel({
    //   ...cancel,
    //   ...{
    //     [cancelName]: c,
    //   },
    // });
    cancel[cancelName] = c;
  };

  const fileWithProgress = (
    files: FileUploadedListItem[],
    progress: Progress
  ): FileUploadedListItem[] => {
    return files.map((item) => ({
      ...item,
      progressCurrent: progress[item.name],
    }));
  };

  return (
    <FileUpload
      multiple
      uploadedFile={async (files) => {
        const res = await postFiles(files, uploadProgress, cancelList);
      }}
      render={(files) => {
        return (
          <FileUploadedList
            files={fileWithProgress(files, progress)}
            cancel={cancel}
          />
        );
      }}
    ></FileUpload>
  );
};

export default FileUploadWidget;
