import React from 'react';
import { Typography, Card, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const RecipeList = ({ recipes, title = "Recommended Recipes", showMatchScore = true }) => {
  const navigate = useNavigate();

  if (!recipes || recipes.length === 0) return null;

  return (
    <div style={{ maxWidth: '1200px', width: '100%', marginTop: '20px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          {title}
        </Title>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '30px' 
        }}>
            {recipes.map(recipe => {
                const recipeId = recipe.recipeId || recipe._id;
                return (
                <div 
                    key={recipeId} 
                    onClick={() => navigate(`/recipe/${recipeId}`)}
                    style={{ 
                        width: '300px',
                        cursor: 'pointer',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                  <Card
                    hoverable
                    cover={
                      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                          <img alt={recipe.title} src={recipe.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {showMatchScore && recipe.matchScore !== undefined && (
                             <Tag color={recipe.matchScore > 0.8 ? 'green' : recipe.matchScore > 0.5 ? 'orange' : 'red'} 
                                  style={{ 
                                      position: 'absolute', 
                                      top: '10px', 
                                      right: '10px', 
                                      margin: 0,
                                      fontSize: '0.9rem',
                                      fontWeight: '600',
                                      padding: '4px 8px',
                                      borderRadius: '12px',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                  }}
                             >
                                 {(recipe.matchScore * 100).toFixed(0)}% Match
                             </Tag>
                          )}
                      </div>
                    }
                    bodyStyle={{ padding: '20px' }}
                    style={{ borderRadius: '12px', overflow: 'hidden', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                  >
                     <Title level={4} style={{ margin: '0 0 10px 0', fontSize: '1.1rem', lineHeight: '1.4' }} ellipsis={{ rows: 2 }}>
                       {recipe.title}
                     </Title>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem' }}>
                           View Details →
                        </Text>
                     </div>
                  </Card>
                </div>
                );
            })}
        </div>
    </div>
  );
};

export default RecipeList;
