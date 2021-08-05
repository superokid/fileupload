import reducer from './reducer';
import { POST_FILE, FileUploadedListItem } from './type';

describe('fileupload reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      fileUploadedList: [],
      cancelList: {},
    });
  });

  test('POST_FILE.success', () => {
    const uuid1 = new Date().getTime() + 'name1';
    type FileUploadedListItemMock = Omit<FileUploadedListItem, 'file'>;
    const prevState: FileUploadedListItemMock[] = [
      {
        uuid: uuid1,
        name: 'name1',
        status: 'loading',
        progressCurrent: 0,
        progressTotal: 100,
      },
    ];

    const uuid2 = new Date().getTime() + 'name2';
    const payload = [
      {
        uuid: uuid2,
        name: 'name2',
        status: 'success',
        progressCurrent: 0,
        progressTotal: 100,
      },
    ];

    const expected = [
      {
        uuid: new Date().getTime() + 'name2',
        name: 'name2',
        status: 'success',
        progressCurrent: 0,
        progressTotal: 100,
      },
      {
        uuid: new Date().getTime() + 'name1',
        name: 'name1',
        status: 'loading',
        progressCurrent: 0,
        progressTotal: 100,
      },
    ];
    expect(
      reducer(
        {
          /* @ts-ignore: file mock */
          fileUploadedList: prevState,
          cancelList: {},
        },
        {
          type: POST_FILE.success,
          payload,
        }
      )
    ).toEqual({
      fileUploadedList: expected,
      cancelList: {},
    });
  });
});
