import React from 'react';
import ImgLoading from '../../assets/loading.gif';
import ImgCheck from '../../assets/check.png';
import ImgError from '../../assets/exclamation.png';
import './CustomToast.css';

interface Props {
  text: string;
  subtitle?: string;
  status?: 'loading' | 'success' | 'error';
  withUploadText?: boolean;
}

export const uploadStatusText = {
  loading: 'Uploading',
  success: 'Upload Completed for',
  error: 'Upload Aborted for',
};

const CustomToast: React.FC<Props> = ({
  text,
  subtitle,
  status,
  withUploadText,
}) => {
  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return <img src={ImgLoading} alt="loading-icon" width="15" />;
      case 'success':
        return <img src={ImgCheck} alt="success-icon" width="15" />;
      case 'error':
        return <img src={ImgError} alt="error-icon" width="15" />;
      default:
        return null;
    }
  };

  const renderStatusText = () => {
    if (!status || !withUploadText) return null;
    return <span>{uploadStatusText[status] + ' '}</span>;
  };

  return (
    <div className="c-toast">
      <div className="c-toast__header">
        <div className="c-toast__icon mr-1">{renderStatus()}</div>
        <div className="c-toast__text">
          {renderStatusText()}
          <span>{text}</span>
        </div>
      </div>
      <div className="c-toast__subtitle">{subtitle}</div>
    </div>
  );
};

export default CustomToast;
