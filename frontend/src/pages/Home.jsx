import { Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: "url('/background.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>

      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)' // Optional overlay for better text contrast
      }}>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              fontFamily: "serif",
              background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              marginBottom: '2rem'
            }}>
              Welcome to my recipe website
            </h1>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => navigate('/dashboard')}
              style={{
                fontSize: '1.5rem',
                height: 'auto',
                padding: '10px 40px',
                background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(255, 126, 95, 0.4)'
              }}
            >
              Let's get started
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}