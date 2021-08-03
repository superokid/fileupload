import { render } from '@testing-library/react';
import { FileUploadedListItem } from './FileUpload';
import FileUploadedList from './FileUploadedList';
import Root from '../../test/Root';
import { initialState } from '../../test/redux';

describe('<FileUploadList />', () => {
  test('render empty', () => {
    render(
      <Root initialState={initialState}>
        <FileUploadedList />
      </Root>
    );
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
        progressCurrent: 10,
        progressTotal: 20,
        file: fileMock,
      },
    ];
    const { getByText } = render(
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
    );
    expect(getByText(files[0].name)).toBeInTheDocument();
    expect(getByText('10 B / 20 B')).toBeInTheDocument();
  });
});
