
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Spin, Divider, Tag, Button, List, Avatar, message } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, TeamOutlined, ExperimentOutlined } from '@ant-design/icons';
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
        <Layout style={{ minHeight: '100vh', backgroundColor: '#F9F7F5' }}>
            <Header style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#fff', 
                padding: '0 40px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                height: '64px'
            }}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => navigate('/dashboard')}
                    style={{ fontSize: '16px', marginRight: '20px' }}
                >
                    Back
                </Button>
                <Title level={4} style={{ margin: 0, fontFamily: 'serif', color: '#4a4a4a' }}>SnapCook</Title>
            </Header>

            <Content style={{ padding: '24px 50px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '800px', width: '100%', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Title level={1} style={{ fontFamily: 'serif', color: '#2c2c2c', marginBottom: '10px' }}>
                            {recipe.title}
                        </Title>
                        {recipe.description && (
                            <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                {recipe.description}
                            </Paragraph>
                        )}
                        
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                            {recipe.prepTime && (
                                <Tag icon={<ClockCircleOutlined />} color="blue">Prep: {recipe.prepTime} min</Tag>
                            )}
                            {recipe.cookTime && (
                                <Tag icon={<ClockCircleOutlined />} color="cyan">Cook: {recipe.cookTime} min</Tag>
                            )}
                             {recipe.servings && (
                                <Tag icon={<TeamOutlined />} color="green">{recipe.servings} Servings</Tag>
                            )}
                             {recipe.difficulty && (
                                <Tag icon={<ExperimentOutlined />} color={
                                    recipe.difficulty === 'easy' ? 'green' : 
                                    recipe.difficulty === 'medium' ? 'orange' : 'red'
                                } style={{ textTransform: 'capitalize' }}>
                                    {recipe.difficulty}
                                </Tag>
                            )}
                        </div>
                    </div>

                    <Divider />

                    <div style={{ marginBottom: '30px' }}>
                        <Title level={3} style={{ fontFamily: 'serif' }}>Ingredients</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={recipe.ingredients}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{item.ingredient.name[0].toUpperCase()}</Avatar>}
                                        title={<span style={{ textTransform: 'capitalize' }}>{item.ingredient.name}</span>}
                                        description={`${item.quantity} ${item.unit || ''} ${item.optional ? '(Optional)' : ''}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>

                    <Divider />

                    <div>
                        <Title level={3} style={{ fontFamily: 'serif' }}>Instructions</Title>
                        <List
                            size="large"
                            dataSource={recipe.instructions}
                            renderItem={(item, index) => (
                                <List.Item style={{ alignItems: 'flex-start' }}>
                                     <Text strong style={{ marginRight: '15px', color: '#fa8c16' }}>{index + 1}.</Text>
                                     <Text>{item}</Text>
                                </List.Item>
                            )}
                        />
                    </div>

                </div>
            </Content>
        </Layout>
    );
};
