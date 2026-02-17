import React, { useState, useEffect } from 'react';
import { Layout, Input, Typography, Button, Spin, message } from 'antd';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';
import RecipeList from '../components/RecipeList';

const { Header, Content } = Layout;
const { Title } = Typography;

export const SearchRecipes = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    handleSearch(initialQuery);
  }, [initialQuery]);

  const handleSearch = async (searchQuery) => {
    // if (!searchQuery.trim()) return; // Allow empty search for initial load
    
    setLoading(true);
    setSearched(true);
    
    // Update URL param without reloading
    setSearchParams({ q: searchQuery });

    try {
      const response = await axios.get(`${ENDPOINTS.SEARCH_RECIPES}?q=${encodeURIComponent(searchQuery)}`, { withCredentials: true });
      
      if (response.data.success) {
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error("Search failed:", error);
      message.error("Failed to search recipes.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#F9F7F5' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        padding: '0 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        height: '64px'
      }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/dashboard')}
          style={{ marginRight: '10px', fontSize: '16px' }}
        >
          Back
        </Button>
        <Title level={4} style={{ margin: 0, fontWeight: 600, color: '#4a4a4a' }}>Search Recipes</Title>
      </Header>

      <Content style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px', width: '100%', marginBottom: '40px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 700 }}>
            Find your next meal
          </Title>
          <Input.Search
            placeholder="Search by recipe name or ingredient..."
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />} style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', border: 'none' }}>Search</Button>}
            size="large"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            style={{ width: '100%' }}
          />
        </div>

        {loading ? (
          <div style={{ marginTop: '50px' }}>
            <Spin size="large" tip="Searching..." />
          </div>
        ) : (
          <>
            {searched && recipes.length === 0 && query.trim() !== '' && (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
                <p style={{ fontSize: '1.2rem' }}>No recipes found for "{query}"</p>
                <p>Try searching for a different ingredient or recipe name.</p>
              </div>
            )}
            
            {(recipes.length > 0 || (searched && query === '')) && <RecipeList recipes={recipes} title={query ? "Search Results" : "Suggested Recipes"} showMatchScore={false} />}
          </>
        )}
      </Content>
    </Layout>
  );
};
