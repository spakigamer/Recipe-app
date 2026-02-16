import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Button, Spin, Layout } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might fetch user details from an API using the token
    // For now, we'll try to decode the token or fetch from a 'me' endpoint if it exists
    // Or just mock it if we don't have the endpoint yet.
    // Let's assume we have a /auth/me endpoint or similar, or just show a placeholder.
    
    // Fetch user data from API
    const fetchUser = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_USER, { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
            // Fallback or redirect to login? For now just log.
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/dashboard')} type="text">
          Back to Dashboard
        </Button>
      </Header>
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{ width: 400, borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          cover={
            <div style={{ height: 150, background: 'linear-gradient(to right, #ff7e5f, #feb47b)', borderRadius: '10px 10px 0 0' }} />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-50px' }}>
            <Avatar
              size={100}
              src={user?.picture}
              icon={<UserOutlined />}
              style={{ border: '4px solid #fff', backgroundColor: '#87d068' }}
            />
            <Title level={3} style={{ marginTop: 10, marginBottom: 5 }}>{user?.name}</Title>
            <Text type="secondary">{user?.email}</Text>
            
            <div style={{ width: '100%', marginTop: 20 }}>
                 {/* Additional profile details can go here */}
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};
