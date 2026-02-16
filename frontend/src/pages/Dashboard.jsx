import React, { useState } from 'react';
import { Layout, Button, Typography, Upload, message, Dropdown, Menu, Avatar } from 'antd';
import { LogoutOutlined, InboxOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Dragger } = Upload;

export const Dashboard = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [tags, setTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [fetchingRecipes, setFetchingRecipes] = useState(false);

  const handleLogout = () => {
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    message.success('Logged out successfully');
    navigate('/login');
  };

  const handleMenuClick = (e) => {
    if (e.key === 'profile') {
      navigate('/profile');
    } else if (e.key === 'logout') {
      handleLogout();
    }
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleAnalyzeImage = async (file) => {
      setAnalyzing(true);
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      const formData = new FormData();
      formData.append('image', file);

      try {
          const response = await axios.post(ENDPOINTS.ANALYZE_IMAGE, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
              withCredentials: true
          });
          
          if (response.data.success) {
            const rawData = response.data.data.raw;
            let detectedTags = [];

            if (Array.isArray(rawData)) {
                 // Extract labels from the array of objects
                 detectedTags = rawData.map(item => item.label);
            } else if (typeof rawData === 'string') {
                // ... fallback logic if needed, but primary is array of objects
                 try {
                     const jsonMatch = rawData.match(/\[.*\]/s);
                     if (jsonMatch) detectedTags = JSON.parse(jsonMatch[0]);
                     else detectedTags = rawData.split(',').map(s => s.trim());
                 } catch (e) { console.error(e); }
            }
            setTags(detectedTags);
            message.success('Ingredients detected!');
          }
      } catch (error) {
          console.error("Analysis failed", error);
          message.error("Failed to analyze image.");
      } finally {
          setAnalyzing(false);
      }
  };

  const handleFetchRecipes = async () => {
      setFetchingRecipes(true);
      try {
          const response = await axios.post(ENDPOINTS.RECOMMEND_RECIPES, { tags }, { withCredentials: true });
          if (response.data.success) {
              setRecipes(response.data.recipes);
              message.success(`Found ${response.data.recipes.length} recipes!`);
          }
      } catch (error) {
          console.error("Recipe fetch failed", error);
          message.error("Failed to fetch recipes.");
      } finally {
          setFetchingRecipes(false);
      }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    fileList,
    onRemove: (file) => {
        setFileList([]);
        setTags([]);
        setRecipes([]);
        setPreviewImage(null);
    },
    beforeUpload: (file) => {
        setFileList([file]);
        handleAnalyzeImage(file);
        return false; // Prevent default upload
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#F9F7F5',overflow:"visible" }}>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        padding: '0 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        height: '64px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
           <span style={{ fontSize: '24px', marginRight: '10px' }}>👨‍🍳</span>
           <Title level={4} style={{ margin: 0, fontFamily: 'serif', color: '#4a4a4a' }}>SnapCook</Title>
        </div>
        
        <div>
           <Dropdown menu={{ items: [
              { label: 'Profile', key: 'profile', icon: <UserOutlined /> },
              { label: 'Sign out', key: 'logout', icon: <LogoutOutlined /> }
           ], onClick: handleMenuClick }} placement="bottomRight" arrow>
             <Button type="text" style={{ height: 'auto', padding: '5px' }}>
                <span style={{ marginRight: 8, fontSize: '16px', color: '#555' }}>Account</span>
                <UserOutlined style={{ fontSize: '16px', color: '#555' }} /> 
             </Button>
           </Dropdown>
        </div>
      </Header>
      
      <Content style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '50px 20px',
        flex: 1
      }}>
         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
             <Title level={1} style={{ fontFamily: 'serif', color: '#2c2c2c', marginBottom: '16px', fontSize: '3rem' }}>
                 What's in your kitchen?
             </Title>
             <Text type="secondary" style={{ fontSize: '1.2rem' }}>
                 Snap a photo of your ingredients and we'll suggest<br />
                 delicious recipes you can make right now.
             </Text>
         </div>

         <div style={{ width: '100%', maxWidth: '800px', marginBottom: '30px' }}>
            {previewImage ? (
                <div style={{ 
                    position: 'relative', 
                    textAlign: 'center', 
                    marginBottom: '20px', 
                    backgroundColor: '#fff', 
                    padding: '20px', 
                    borderRadius: '12px', 
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
                }}>
                    <Button 
                        type="text" 
                        icon={<CloseOutlined style={{ fontSize: '20px', color: '#999' }} />} 
                        onClick={() => {
                             setPreviewImage(null);
                             setTags([]);
                             setRecipes([]);
                             setFileList([]);
                        }}
                        style={{ 
                            position: 'absolute', 
                            top: '10px', 
                            right: '10px', 
                            zIndex: 10 
                        }}
                    />

                    <img 
                        src={previewImage} 
                        alt="Uploaded ingredients" 
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '400px', 
                            borderRadius: '8px', 
                            marginBottom: '20px'
                        }} 
                    />

                    {tags.length > 0 && (
                        <div style={{ textAlign: 'center' }}>
                            <Title level={4}>Detected Ingredients:</Title>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                                {tags.map((tag, index) => (
                                    <span key={index} style={{ 
                                        padding: '6px 12px', 
                                        background: '#e6f7ff', 
                                        border: '1px solid #91d5ff', 
                                        borderRadius: '4px',
                                        color: '#0050b3'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <Button 
                                type="primary" 
                                size="large" 
                                onClick={handleFetchRecipes} 
                                loading={fetchingRecipes}
                                style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', border: 'none' }}
                            >
                                Find Recipes
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <Dragger {...uploadProps} style={{ 
                    padding: '40px', 
                    backgroundColor: '#fbfbfb', 
                    border: '2px dashed #e8e8e8',
                    borderRadius: '12px'
                }}>
                    <p className="ant-upload-drag-icon">
                    < InboxOutlined style={{ color: '#ff7e5f', fontSize: '48px' }} />
                    </p>
                    <p className="ant-upload-text" style={{ fontSize: '1.2rem', fontWeight: 500 }}>
                        {analyzing ? "Analyzing image..." : "Upload a photo of your ingredients"}
                    </p>
                    <p className="ant-upload-hint" style={{ color: '#888' }}>
                        Drag & drop or click to select
                    </p>
                </Dragger>
            )}
         </div>

        {recipes.length > 0 && (
            <div style={{ maxWidth: '1000px', width: '100%' }}>
                <Title level={3} style={{ textAlign: 'center' }}>Recommended Recipes</Title>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {recipes.map(recipe => (
                        <div key={recipe.recipeId} 
                            onClick={() => navigate(`/recipe/${recipe.recipeId}`)}
                            style={{ 
                            background: '#fff', 
                            borderRadius: '8px', 
                            padding: '20px', 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <Title level={4}>{recipe.title}</Title>
                            <Text>Match Score: {Math.round(recipe.matchScore * 100)}%</Text>
                             {/* Add more recipe details here */}
                        </div>
                    ))}
                </div>
            </div>
        )}

      </Content>
    </Layout>
  );
};
