const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  GOOGLE_LOGIN: `${API_BASE_URL}/auth/google`,
  RECIPES: `${API_BASE_URL}/recipes`,
  VERIFY_USER: `${API_BASE_URL}/auth/verify`,
  GET_USER: `${API_BASE_URL}/auth/me`,
  ANALYZE_IMAGE: `${API_BASE_URL}/recipe/analyze-image`,
  RECOMMEND_RECIPES: `${API_BASE_URL}/recipe/match-and-recommend`,
  SEARCH_RECIPES: `${API_BASE_URL}/recipe/search`,
  GET_ALL_INGREDIENTS: `${API_BASE_URL}/recipe/ingredients`,
  GET_RECIPE_DETAILS: (id) => `${API_BASE_URL}/recipe/${id}`,
  MARK_RECIPE_COOKED: `${API_BASE_URL}/auth/cooked`,
};
