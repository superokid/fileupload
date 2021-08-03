import React from 'react';
import ImgLoading from '../assets/loading.gif';
import ImgCheck from '../assets/check.png';
import ImgError from '../assets/exclamation.png';

interface Props {
  text: string;
  subtitle?: string;
  status?: 'loading' | 'success' | 'error';
}

const CustomToast: React.FC<Props> = ({ text, subtitle, status }) => {
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

  return (
    <div>
      {renderStatus()}
      {text}
    </div>
  );
};

export default CustomToast;
