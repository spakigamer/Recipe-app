import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Button, Spin, Layout, Row, Col, Statistic, message } from 'antd';
import { UserOutlined, ArrowLeftOutlined, HeartOutlined, FireOutlined } from '@ant-design/icons';
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
    const fetchUser = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_USER, { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
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
    <Layout className="dashboard-layout">
        <Header className="dashboard-header">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/dashboard')} type="text" style={{ marginRight: '10px' }}/>
                <span style={{ fontSize: '24px', marginRight: '10px' }}>👨‍🍳</span>
                <Title level={4} className="brand-title" style={{ margin: 0 }}>SnapCook Profile</Title>
            </div>
        </Header>

      <Content style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        
        <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '0', overflow: 'hidden' }}>
            <div style={{ 
                height: '180px', 
                background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '5px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    backdropFilter: 'blur(5px)'
                }}>
                    <Avatar
                        size={120}
                        src={user?.picture}
                        icon={<UserOutlined />}
                        style={{ border: '4px solid #fff', backgroundColor: '#87d068' }}
                    />
                </div>
            </div>

            <div style={{ marginTop: '70px', padding: '0 30px 40px', textAlign: 'center' }}>
                <Title level={2} style={{ marginBottom: '5px', fontWeight: 700 }}>{user?.name || 'Chef'}</Title>
                <Text type="secondary" style={{ fontSize: '1.1rem' }}>{user?.email}</Text>

                <div style={{ marginTop: '30px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '30px' }}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Statistic title="Recipes Cooked" value={user?.cookedRecipes?.length || 0} prefix={<FireOutlined style={{ color: '#ff7e5f' }}/>} />
                        </Col>
                    </Row>
                </div>
                
                {user?.cookedRecipes?.length > 0 && (
                     <div style={{ marginTop: '30px', textAlign: 'left' }}>
                        <Title level={4} style={{ fontWeight: 600, marginBottom: '15px' }}>Cooked History</Title>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px' }}>
                            {user.cookedRecipes.map((recipe, index) => (
                                <div key={index} style={{ cursor: 'pointer' }} onClick={() => navigate(`/recipe/${recipe._id}`)}>
                                    <div style={{ 
                                        height: '80px', 
                                        borderRadius: '8px', 
                                        backgroundImage: `url(${recipe.image})`, 
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center',
                                        marginBottom: '5px'
                                    }}/>
                                    <Text ellipsis style={{ fontSize: '0.9rem', width: '100%', display: 'block' }}>{recipe.title}</Text>
                                </div>
                            ))}
                        </div>
                     </div>
                )}

                <div style={{ marginTop: '40px' }}>
                    <Button type="primary" size="large" onClick={() => message.info("Feature coming soon!")} style={{ 
                        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', 
                        border: 'none',
                        padding: '0 40px',
                        height: '45px',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(255, 126, 95, 0.4)'
                    }}>
                        Edit Profile
                    </Button>
                </div>
            </div>
        </div>

      </Content>
    </Layout>
  );
};
