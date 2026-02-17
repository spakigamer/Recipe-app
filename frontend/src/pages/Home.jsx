import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { ExperimentOutlined, ThunderboltOutlined, SafetyCertificateOutlined } from '@ant-design/icons'

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-layout">
      <header className="home-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>👨‍🍳</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>SnapCook</span>
        </div>
        <div>
            <Button type="text" style={{ color: '#fff', fontSize: '1rem' }} onClick={() => navigate('/login')}>Login</Button>
            <Button type="primary" shape="round" size="large" onClick={() => navigate('/login')}>Get Started</Button>
        </div>
      </header>

      <section className="home-hero" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="hero-content">
          <h1 className="hero-title">Discover Recipes from Your Kitchen</h1>
          <p className="hero-subtitle">Snap a photo of your ingredients and let AI suggest delicious recipes instantly.</p>
          <Button 
            type="primary" 
            size="large" 
            className="home-button" 
            style={{ 
                height: '56px', 
                padding: '0 40px', 
                fontSize: '1.2rem', 
                background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                border: 'none'
            }}
            onClick={() => navigate('/dashboard')}
          >
            Sart Cooking Now
          </Button>
        </div>
      </section>

      <section className="features-section">
          <h2 className="section-title">Why SnapCook?</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
              <div className="feature-card">
                  <div className="feature-icon">
                      <ExperimentOutlined />
                  </div>
                  <h3 className="feature-title">AI Powered Analysis</h3>
                  <p className="feature-description">
                      Our advanced AI identifies ingredients from your photos with high accuracy.
                  </p>
              </div>

              <div className="feature-card">
                  <div className="feature-icon">
                      <ThunderboltOutlined style={{ color: '#ffec3d' }} />
                  </div>
                  <h3 className="feature-title">Instant Recipes</h3>
                  <p className="feature-description">
                      Get curated recipe suggestions based on what you actually have in your pantry.
                  </p>
              </div>

              <div className="feature-card">
                  <div className="feature-icon">
                      <SafetyCertificateOutlined style={{ color: '#52c41a' }} />
                  </div>
                  <h3 className="feature-title">Reduce Waste</h3>
                  <p className="feature-description">
                      Use up your leftovers and reduce food waste by finding creative ways to cook them.
                  </p>
              </div>
          </div>
      </section>

      <footer className="home-footer">
          © 2024 SnapCook. All rights reserved.
      </footer>
    </div>
  )
}