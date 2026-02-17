
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import AxiosInterceptor from './components/AxiosInterceptor';

const Login = lazy(() => import('./pages/Login'));
const RecipeDetails = lazy(() => import('./pages/RecipeDetails').then(module => ({ default: module.RecipeDetails })));
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const SearchRecipes = lazy(() => import('./pages/SearchRecipes').then(module => ({ default: module.SearchRecipes })));
const Protect = lazy(() => import('./pages/Protect').then(module => ({ default: module.Protect })));

function App() {
  return (
    <Router>
      <AxiosInterceptor>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Protect><Dashboard /></Protect>} />
            <Route path="/profile" element={<Protect><Profile /></Protect>} />
            <Route path="/search" element={<Protect><SearchRecipes /></Protect>} />
            <Route path="/recipe/:id" element={<Protect><RecipeDetails /></Protect>} />
          </Routes>
        </Suspense>
      </AxiosInterceptor>
    </Router>
  )
}

export default App
