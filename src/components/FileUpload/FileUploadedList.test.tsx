import { render } from '@testing-library/react';
import { FileUploadedListItem } from '../../store/features/fileupload/type';
import FileUploadedList from './FileUploadedList';
import Root from '../../test/Root';
import { initialState } from '../../test/redux';

describe('<FileUploadList />', () => {
  const fileName = 'mockFile.xml';
  const fileMock = new File(['mockFile'], fileName, {
    type: 'application/xml',
  });

  test('render empty', () => {
    render(
      <Root initialState={initialState}>
        <FileUploadedList />
      </Root>
    );
  });
  test('render list of file', () => {
    const files: FileUploadedListItem[] = [
      {
        uuid: new Date().getTime() + 'name1',
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

  test('render loading state', () => {
    const files: FileUploadedListItem[] = [
      {
        uuid: new Date().getTime() + 'name1',
        name: 'name1',
        status: 'loading',
        progressCurrent: 10,
        progressTotal: 20,
        file: fileMock,
      },
    ];
    const { getByText, getByAltText } = render(
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
    expect(getByText('cancel')).toBeInTheDocument();
    expect(getByAltText('loading-icon')).toBeInTheDocument();
  });

  test('render finished state', () => {
    const files: FileUploadedListItem[] = [
      {
        uuid: new Date().getTime() + 'name1',
        name: 'name1',
        status: 'success',
        progressCurrent: 10,
        progressTotal: 20,
        file: fileMock,
      },
    ];
    const { getByText, getByAltText } = render(
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
    expect(getByText('remove')).toBeInTheDocument();
    expect(getByAltText('done-icon')).toBeInTheDocument();
  });
});
