import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Spin, Divider, Tag, Button, List, Avatar, message, Checkbox, Row, Col } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, TeamOutlined, ExperimentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(ENDPOINTS.GET_RECIPE_DETAILS(id), { withCredentials: true });
                if (response.data.success) {
                    setRecipe(response.data.recipe);
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
                message.error("Failed to load recipe details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipe();
        }
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F9F7F5' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!recipe) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Title level={3}>Recipe Not Found</Title>
                <Button onClick={() => navigate('/dashboard')}>Go Back</Button>
            </div>
        );
    }

    return (
        <Layout className="dashboard-layout">
            <Header className="dashboard-header">
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/dashboard')} type="text" style={{ marginRight: '10px' }}/>
                    <span style={{ fontSize: '24px', marginRight: '10px' }}>👨‍🍳</span>
                    <Title level={4} className="brand-title" style={{ margin: 0 }}>SnapCook</Title>
                </div>
            </Header>

            <Content style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
                <div className="glass-card" style={{ maxWidth: '1000px', width: '100%', padding: '0', overflow: 'hidden' }}>
                    
                    {/* Hero Image Section */}
                    <div style={{ position: 'relative', height: '400px', backgroundColor: '#f0f0f0' }}>
                        {recipe.image ? (
                            <img 
                                src={recipe.image} 
                                alt={recipe.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem' }}>
                                🍳
                            </div>
                        )}
                        <div style={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            left: 0, 
                            right: 0, 
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            padding: '40px 30px 20px',
                            color: '#fff'
                        }}>
                             <Title level={1} style={{ color: '#fff', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'serif' }}>
                                {recipe.title}
                            </Title>
                        </div>
                    </div>

                    <div style={{ padding: '40px' }}>
                        {/* Meta and Description */}
                        <div style={{ marginBottom: '40px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                                {recipe.prepTime && <Tag icon={<ClockCircleOutlined />} color="blue" style={{ fontSize: '1rem', padding: '5px 10px' }}>Prep: {recipe.prepTime}m</Tag>}
                                {recipe.cookTime && <Tag icon={<ClockCircleOutlined />} color="cyan" style={{ fontSize: '1rem', padding: '5px 10px' }}>Cook: {recipe.cookTime}m</Tag>}
                                {recipe.servings && <Tag icon={<TeamOutlined />} color="green" style={{ fontSize: '1rem', padding: '5px 10px' }}>{recipe.servings} Servings</Tag>}
                                {recipe.difficulty && (
                                    <Tag icon={<ExperimentOutlined />} color={
                                        recipe.difficulty === 'easy' ? 'green' : 
                                        recipe.difficulty === 'medium' ? 'orange' : 'red'
                                    } style={{ textTransform: 'capitalize', fontSize: '1rem', padding: '5px 10px' }}>
                                        {recipe.difficulty}
                                    </Tag>
                                )}
                            </div>
                            
                            {recipe.description && (
                                <Paragraph style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.8' }}>
                                    {recipe.description}
                                </Paragraph>
                            )}
                        </div>

                        <Divider style={{ margin: '30px 0' }}/>

                        <Row gutter={[40, 40]}>
                            {/* Ingredients Column */}
                            <Col xs={24} md={9}>
                                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '25px', borderRadius: '12px' }}>
                                    <Title level={3} style={{ fontFamily: 'serif', marginBottom: '20px', color: '#d45d3a' }}>Ingredients</Title>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={recipe.ingredients}
                                        renderItem={item => (
                                            <List.Item style={{ border: 'none', padding: '10px 0' }}>
                                                <Checkbox style={{ width: '100%', fontSize: '1rem' }}>
                                                    <span style={{ fontWeight: 600 }}>{item.quantity} {item.unit}</span> 
                                                    <span style={{ marginLeft: '5px', textTransform: 'capitalize' }}>{item.ingredient?.name || 'Unknown Ingredient'}</span>
                                                    {item.optional && <span style={{ color: '#888', fontStyle: 'italic', marginLeft: '5px' }}>(Optional)</span>}
                                                </Checkbox>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Col>

                            {/* Instructions Column */}
                            <Col xs={24} md={15}>
                                <div>
                                    <Title level={3} style={{ fontFamily: 'serif', marginBottom: '20px', color: '#d45d3a' }}>Instructions</Title>
                                    <List
                                        size="large"
                                        dataSource={recipe.instructions}
                                        renderItem={(item, index) => (
                                            <List.Item style={{ alignItems: 'flex-start', border: 'none', paddingBottom: '25px' }}>
                                                 <div style={{ 
                                                     minWidth: '30px', 
                                                     height: '30px', 
                                                     background: '#ff7e5f', 
                                                     color: '#fff', 
                                                     borderRadius: '50%', 
                                                     display: 'flex', 
                                                     alignItems: 'center', 
                                                     justifyContent: 'center',
                                                     fontWeight: 'bold',
                                                     marginRight: '20px',
                                                     marginTop: '3px'
                                                 }}>
                                                     {index + 1}
                                                 </div>
                                                 <Text style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>{item}</Text>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Col>
                        </Row>
                        
                        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
                           <Button type="primary" size="large" icon={<CheckCircleOutlined />} style={{ 
                               background: 'linear-gradient(to right, #52c41a, #87d068)', 
                               border: 'none',
                               height: '50px',
                               padding: '0 40px',
                               fontSize: '1.1rem',
                               borderRadius: '25px',
                               boxShadow: '0 4px 15px rgba(82, 196, 26, 0.4)'
                           }} onClick={async () => {
                               try {
                                   const response = await axios.post(ENDPOINTS.MARK_RECIPE_COOKED, { recipeId: recipe._id || recipe.recipeId || id }, { withCredentials: true });
                                   if (response.data.success) {
                                       message.success("Recipe marked as cooked!");
                                   } else {
                                       message.info(response.data.message);
                                   }
                               } catch (error) {
                                   console.error("Failed to mark as cooked", error);
                                   message.error("Failed to mark recipe as cooked");
                               }
                           }}>
                               Mark as Cooked
                           </Button>
                        </div>

                    </div>
                </div>
            </Content>
        </Layout>
    );
};
