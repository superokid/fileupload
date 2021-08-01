import React from 'react';
import { render } from '@testing-library/react';
import FileUploadWidget from './FileUploadWidget';

describe('<FileUploadWidget/>', () => {
  test('render', () => {
    render(<FileUploadWidget />);
  });
});
