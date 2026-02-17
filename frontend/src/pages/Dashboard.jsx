import React, { useState } from 'react';
import { Layout, Button, Typography, message, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';
import ImageUploader from '../components/ImageUploader';
import RecipeList from '../components/RecipeList';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export const Dashboard = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [fetchingRecipes, setFetchingRecipes] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleLogout = () => {
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    message.success('Logged out successfully');
    navigate('/login');
  };

  const handleMenuClick = (e) => {
    if (e.key === 'profile') navigate('/profile');
    else if (e.key === 'logout') handleLogout();
  };

  const handleAnalyzeImage = async (file) => {
      setAnalyzing(true);
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
                 detectedTags = rawData.map(item => item.label);
            } else if (typeof rawData === 'string') {
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
      if (tags.length === 0) return;
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

  const handleClear = () => {
    setPreviewImage(null);
    setTags([]);
    setRecipes([]);
  };

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
           <span style={{ fontSize: '28px', marginRight: '10px' }}>👨‍🍳</span>
           <Title level={3} className="brand-title" style={{ margin: 0 }}>SnapCook</Title>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button 
                type="text" 
                icon={<SearchOutlined />} 
                onClick={() => navigate('/search')}
                style={{ marginRight: '15px', fontSize: '16px' }}
            >
                Search Recipes
            </Button>

            <Dropdown menu={{ items: [
                { label: 'Profile', key: 'profile', icon: <UserOutlined /> },
                { label: 'Sign out', key: 'logout', icon: <LogoutOutlined /> }
            ], onClick: handleMenuClick }} placement="bottomRight" arrow>
                 <Button type="text" style={{ padding: '5px' }}>
                    <span style={{ marginRight: 8, fontSize: '16px', color: '#555' }}>Account</span>
                    <UserOutlined style={{ fontSize: '18px', color: '#555' }} /> 
                 </Button>
            </Dropdown>
        </div>
      </Header>
      
      <Content style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '60px 20px',
        flex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
         <div style={{ textAlign: 'center', marginBottom: '50px' }}>
             <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '20px', color: '#1f1f1f' }}>
                 What's in your kitchen?
             </h1>
             <Text type="secondary" style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', display: 'block', margin: '0 auto', lineHeight: '1.6' }}>
                 Snap a photo of your ingredients and we'll suggest
                 delicious recipes you can make right now.
             </Text>
         </div>

         <ImageUploader 
            previewImage={previewImage}
            analyzing={analyzing}
            onFileSelect={handleAnalyzeImage}
            onClear={handleClear}
            tags={tags}
            setTags={setTags} 
            onFetchRecipes={handleFetchRecipes}
            fetchingRecipes={fetchingRecipes}
         />

         <RecipeList recipes={recipes} />

      </Content>
    </Layout>
  );
};
