import React from 'react';
import { render } from '@testing-library/react';
import FileUploadWidget from './FileUploadWidget';
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
});
