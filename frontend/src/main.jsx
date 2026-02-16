import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'

const client=import.meta.env.VITE_GOOGLE_CLIENT;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={client}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
