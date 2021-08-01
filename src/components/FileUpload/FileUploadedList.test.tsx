import { render } from '@testing-library/react';
import { FileUploadedListItem } from './FileUpload';
import FileUploadedList from './FileUploadedList';

describe('<FileUploadList />', () => {
  test('render empty', () => {
    render(<FileUploadedList files={[]} />);
  });
  test('render list of file', () => {
    const fileName = 'mockFile.xml';
    const fileMock = new File(['mockFile'], fileName, {
      type: 'application/xml',
    });

    const files: FileUploadedListItem[] = [
      {
        name: 'name1',
        status: 'loading',
        progress: {
          current: 10,
          total: 20,
        },
        file: fileMock,
      },
    ];
    const { getByText } = render(<FileUploadedList files={files} />);
    expect(getByText(files[0].name)).toBeInTheDocument();
    expect(getByText('10 B / 20 B')).toBeInTheDocument();
  });
});
