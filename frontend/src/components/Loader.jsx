import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999
    }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#fff' }} spin />} />
    </div>
  );
};

export default Loader;
