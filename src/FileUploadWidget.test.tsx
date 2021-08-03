import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUploadWidget from './FileUploadWidget';
import FileUpload, {
  FileUploadedListItem,
} from './components/FileUpload/FileUpload';
import FileUploadedList from './components/FileUpload/FileUploadedList';
import Root from './test/Root';
import { initialState } from './test/redux';

describe('<FileUploadWidget/>', () => {
  test('render', () => {
    render(
      <Root initialState={initialState}>
        <FileUploadWidget />
      </Root>
    );
  });

  test('press upload show the file list', async () => {
    const fileName = 'mockFile.xml';
    const fileMock = new File(['mockFile'], fileName, {
      type: 'application/xml',
    });

    let files: FileUploadedListItem[] = [];
    const { getByTestId, getByText, queryByText } = render(
      <>
        <FileUpload
          uploadedFile={(files) => {
            files = files;
          }}
        />
        <Root
          initialState={{
            fileupload: {
              fileUploadedList: files,
              cancelList: {},
            },
          }}
        >
          <FileUploadedList />
        </Root>
      </>
    );

    expect(queryByText(fileName)).toBeNull();

    fireEvent.change(getByTestId('fileInput'), {
      target: { files: [fileMock] },
    });

    await waitFor(() => {
      fireEvent.click(getByText('Upload'));
      expect(queryByText(fileName)).toBeInTheDocument();
    });
  });
});
