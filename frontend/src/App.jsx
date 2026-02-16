
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { RecipeDetails } from './pages/RecipeDetails'
import './App.css'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Profile } from './pages/Profile'
import { Protect } from './pages/Protect.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Protect><Dashboard /></Protect>} />
        <Route path="/profile" element={<Protect><Profile /></Protect>} />
        <Route path="/recipe/:id" element={<Protect><RecipeDetails /></Protect>} />
      </Routes>
    </Router>
  )
}

export default App
