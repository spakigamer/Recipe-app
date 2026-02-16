import { message } from 'antd';

export const showSuccess = (msg) => {
  message.success(msg);
};

export const showError = (msg) => {
  message.error(msg);
};

export const handleApiError = (error) => {
  const msg = error.response?.data?.message || 'Something went wrong';
  showError(msg);
};
