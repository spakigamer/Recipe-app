import { Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-overlay">
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h1 className="home-title">
              Welcome to my recipe website
            </h1>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => navigate('/dashboard')}
              className="home-button"
            >
              Let's get started
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}