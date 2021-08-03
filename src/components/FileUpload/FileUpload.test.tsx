import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('<FileUpload />', () => {
  const fileName = 'mockFile.xml';
  const fileMock = new File(['mockFile'], fileName, {
    type: 'application/xml',
  });

  test('render FileUpload', () => {
    const { getByText } = render(<FileUpload />);
    expect(getByText('Select a file')).toBeInTheDocument();
  });

  test('uploadedFile', async () => {
    let uploadedFile: FileList;
    const { getByTestId, getByText } = render(
      <FileUpload
        uploadedFile={(files) => {
          uploadedFile = files;
        }}
      />
    );

    fireEvent.change(getByTestId('fileInput'), {
      target: { files: [fileMock] },
    });

    fireEvent.click(getByText('Upload'));

    await waitFor(() => {
      expect(uploadedFile[0].name).toBe(fileName);
    });
  });
});
