    import React from 'react';
    import { Card, Typography, Button } from 'antd';
    import { useGoogleLogin } from '@react-oauth/google';
    import { GoogleOutlined, InfoCircleOutlined } from '@ant-design/icons';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { showSuccess, showError } from '../utils/helpers';
    import { ENDPOINTS } from '../utils/endpoints';

    const { Title, Text } = Typography;

    const Login = () => {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                await axios.post(ENDPOINTS.GOOGLE_LOGIN, { token: codeResponse.access_token }, { withCredentials: true });
                showSuccess('Login Successful!');
                navigate('/dashboard');
            } catch (error) {
                console.error('Login error:', error);
                showError('Login Failed. Please try again.');
            }
        },
        onError: (error) => {
        console.log('Google Login Failed:', error);
        showError('Login Failed. Please try again.');
        },
    });

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundImage: "url('/background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        }}>
            {/* Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)' }}></div>

            <Card
                className="glass-card"
                style={{
                    width: 400,
                    textAlign: 'center',
                    padding: '40px 24px',
                    zIndex: 1
                }}
                variant="borderless"
            >
                <div style={{ marginBottom: 40 }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👨‍🍳</div>
                    <Title level={2} style={{ margin: '0 0 8px', color: '#1f1f1f' }}>Welcome Back</Title>
                    <Text type="secondary" style={{ fontSize: '16px' }}>Sign in to access your recipes</Text>
                </div>
                
                <Button
                    type="default"
                    size="large"
                    icon={<GoogleOutlined style={{ fontSize: '18px', color: '#DB4437' }} />}
                    onClick={() => login()}
                    style={{
                        width: '100%',
                        height: '50px',
                        fontSize: '16px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        borderColor: '#d9d9d9',
                        boxShadow: '0 2px 0 rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#40a9ff';
                        e.currentTarget.style.color = '#40a9ff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d9d9d9';
                        e.currentTarget.style.color = 'inherit';
                    }}
                >
                    Sign in with Google
                </Button>

                <div style={{ marginTop: '24px', textAlign: 'center', padding: '0 10px' }}>
                    <Text type="secondary" style={{ fontSize: '13px', display: 'block', lineHeight: '1.5' }}>
                        <InfoCircleOutlined style={{ marginRight: '5px', color: '#1890ff' }} />
                        Note: Please enable third-party cookies in your browser settings for a smoother login experience.
                    </Text>
                </div>
            </Card>
        </div>
    );
    };

    export default Login;
