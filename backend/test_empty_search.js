import axios from 'axios';

async function testEmptySearch() {
  console.log("Attempting to connect to http://localhost:3000/api/recipe/search");
  try {
    const response = await axios.get('http://localhost:3000/api/recipe/search'); 
    
    if (response.data.success && response.data.recipes.length > 0) {
      console.log('✅ Empty search returned recipes:', response.data.recipes.length);
      console.log('First recipe:', response.data.recipes[0].title);
    } else {
      console.error('❌ Empty search returned no recipes or failed:', response.data);
    }
  } catch (error) {
    console.error('❌ Request failed with error code:', error.code);
    if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
    } else {
        console.error('Error message:', error.message);
    }
  }
}

testEmptySearch();
