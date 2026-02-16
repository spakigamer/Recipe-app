import React, { useState, useEffect } from 'react';
import { Upload, Button, Typography, Spin, Select, message } from 'antd';
import { InboxOutlined, CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';

const { Dragger } = Upload;
const { Title } = Typography;

const ImageUploader = ({ 
  previewImage, 
  analyzing, 
  onFileSelect, 
  onClear, 
  tags, 
  onFetchRecipes, 
  fetchingRecipes,
  setTags // Need to pass this down from Dashboard
}) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_ALL_INGREDIENTS, { withCredentials: true });
        if (response.data.success) {
          setIngredients(response.data.ingredients);
        }
      } catch (error) {
        console.error("Failed to fetch ingredients list", error);
      }
    };
    fetchIngredients();
  }, []);

  const handleSelect = (value) => {
    if (!tags.includes(value)) {
        if (setTags) {
            setTags([...tags, value]);
            message.success(`Added ${value}`);
        }
    } else {
        message.warning(`${value} is already in the list`);
    }
  };
  
  const uploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
        onFileSelect(file);
        return false; // Prevent default upload
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', marginBottom: '40px' }}>
      {previewImage ? (
        <div className="glass-card" style={{ textAlign: 'center', position: 'relative' }}>
           {analyzing ? (
              <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 20,
                  borderRadius: '16px',
                  backdropFilter: 'blur(5px)'
              }}>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: '#ff7e5f' }} spin />} />
                  <p style={{ marginTop: 20, color: '#ff7e5f', fontWeight: 600, fontSize: '1.1rem' }}>Analyzing your ingredients...</p>
              </div>
           ) : null}

            <Button 
                type="text" 
                icon={<CloseOutlined style={{ fontSize: '24px', color: '#666' }} />} 
                onClick={onClear}
                style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    right: '20px', 
                    zIndex: 10,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
            />

            <img 
                src={previewImage} 
                alt="Uploaded ingredients" 
                style={{ 
                    maxWidth: '100%', 
                    maxHeight: '500px', 
                    borderRadius: '12px', 
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }} 
            />

            {!analyzing && (
                <div style={{ textAlign: 'center' }}>
                    
                    <div style={{ marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                         <Title level={5} style={{ marginBottom: '15px', color: '#555' }}>
                            <PlusOutlined style={{ marginRight: '8px' }}/> 
                            Missed something? Add it manually:
                         </Title>
                         <Select
                            showSearch
                            style={{ width: '100%', textAlign: 'left' }}
                            placeholder="Type to search ingredients..."
                            optionFilterProp="children"
                            onChange={handleSelect}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={ingredients.map(i => ({ value: i.name, label: i.name }))}
                            size="large"
                            allowClear
                         />
                    </div>

                    {tags.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                            <Title level={4} style={{ marginBottom: '20px', color: '#333' }}>Detected Ingredients</Title>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
                                {tags.map((tag, index) => (
                                    <span key={index} className="ingredient-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <Button 
                        type="primary" 
                        size="large" 
                        onClick={onFetchRecipes} 
                        loading={fetchingRecipes}
                        disabled={tags.length === 0}
                        className="home-button"
                        style={{ 
                          width: 'auto',
                          minWidth: '200px',
                          marginTop: '10px',
                          opacity: tags.length === 0 ? 0.6 : 1
                        }}
                    >
                        Find Recipes
                    </Button>
                </div>
            )}
        </div>
      ) : (
        <div className="custom-upload" style={{
            padding: '60px',
            backgroundColor: 'rgba(255,255,255,0.6)',
            borderRadius: '16px',
            border: 'none',
            textAlign: 'center'
        }}>
            <Dragger {...uploadProps} style={{ border: 'none', background: 'transparent' }}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: '#ff7e5f', fontSize: '64px' }} />
                </p>
                <p className="ant-upload-text" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#333', marginBottom: '10px' }}>
                    Click or Drag & Drop to Upload
                </p>
                <p className="ant-upload-hint" style={{ color: '#666', fontSize: '1rem', marginBottom: '20px' }}>
                    Upload a clear photo of your ingredients to get started
                </p>
            </Dragger>

            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px' }}>
                <p style={{ color: '#888', marginBottom: '10px' }}>Or try with a sample:</p>
                <Button 
                    type="default"
                    onClick={async () => {
                        try {
                            const response = await fetch('/pizza-pasta-TRR-ing.jpg');
                            const blob = await response.blob();
                            const file = new File([blob], 'pizza-pasta-TRR-ing.jpg', { type: 'image/jpeg' });
                            onFileSelect(file);
                        } catch (error) {
                            console.error("Failed to load sample image", error);
                            message.error("Failed to load sample image");
                        }
                    }}
                    style={{ borderRadius: '20px' }}
                >
                    Use Sample Image (Pizza & Pasta)
                </Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
