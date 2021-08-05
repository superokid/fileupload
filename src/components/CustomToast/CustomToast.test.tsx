import { render } from '@testing-library/react';
import CustomToast, { uploadStatusText } from './CustomToast';

describe('<CustomToast />', () => {
  test('text & subtitle in document', () => {
    const text = 'text toast';
    const subtitle = 'subtitle';
    const { getByText } = render(
      <CustomToast text={text} subtitle={subtitle} />
    );
    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(subtitle)).toBeInTheDocument();
  });

  test('status loading', () => {
    const { getByAltText } = render(<CustomToast text="" status="loading" />);
    expect(getByAltText('loading-icon')).toBeInTheDocument();
  });

  test('status success', () => {
    const { getByAltText } = render(<CustomToast text="" status="success" />);
    expect(getByAltText('success-icon')).toBeInTheDocument();
  });

  test('status error', () => {
    const { getByAltText } = render(<CustomToast text="" status="error" />);
    expect(getByAltText('error-icon')).toBeInTheDocument();
  });

  test('withUploadText Uploading', () => {
    const { getByText } = render(
      <CustomToast text="" status="loading" withUploadText />
    );
    expect(getByText(uploadStatusText.loading)).toBeInTheDocument();
  });

  test('withUploadText success', () => {
    const { getByText } = render(
      <CustomToast text="" status="success" withUploadText />
    );
    expect(getByText(uploadStatusText.success)).toBeInTheDocument();
  });

  test('withUploadText error', () => {
    const { getByText } = render(
      <CustomToast text="" status="error" withUploadText />
    );
    expect(getByText(uploadStatusText.error)).toBeInTheDocument();
  });
});
