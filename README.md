# SnapCook 🍳

SnapCook is a modern, AI-powered recipe management application that helps users discover new dishes, manage their cooking history, and find recipes based on the ingredients they have.

![SnapCook Dashboard](/frontend/public/vite.svg) (_Replace with actual screenshot_)

## ✨ Key Features

- **AI Ingredient Analysis**: Upload a photo of your fridge or ingredients, and SnapCook uses **Hugging Face's ResNet-50** model to identify items and suggest recipes.
- **Smart Recipe Search**: Find recipes by name or ingredients, powered by fuzzy matching for accurate results.
- **Interactive Recipe Details**: View detailed cooking instructions, ingredient checklists, and nutrition info (cooking time, difficulty, servings).
- **User Profiles**: Track your cooking journey by marking recipes as "Cooked" and viewing your culinary stats.
- **Glassmorphism UI**: A sleek, modern interface built with **React** and **Ant Design**.
- **Secure Authentication**: Google Login and JWT-based authentication with secure cookie handling.

## 🛠️ Tech Stack

### Frontend

- **React** (Vite)
- **Ant Design** (Component Library)
- **Axios** (API Requests)
- **React Router** (Navigation)

### Backend

- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **Cloudinary** (Image Storage via API)
- **Hugging Face Inference API** (AI Model)
- **Fuse.js** (Fuzzy Search)
- **JWT & Google Auth** (Security)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Hugging Face API Token
- Google Cloud Console Project (for OAuth)

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
HUGGINGFACE_API_TOKEN=your_hf_token
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT=your_google_client_id
```

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/snapcook.git
    cd snapcook
    ```

2.  **Install Backend Dependencies**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the App

1.  **Start the Backend**

    ```bash
    cd backend
    npm run dev
    # Server runs on http://localhost:3000
    ```

2.  **Start the Frontend** (in a new terminal)
    ```bash
    cd frontend
    npm run dev
    # App runs on http://localhost:5173
    ```

## 📂 Project Structure

```
snapcook/
├── backend/            # Express Server
│   ├── auth/           # Auth Controllers
│   ├── modules/        # Mongoose Models
│   ├── recipe/         # AI & Recipe Logic
│   └── routes/         # API Routes
└── frontend/           # React App
    ├── src/
    │   ├── components/ # Reusable UI Components
    │   ├── pages/      # Application Pages
    │   └── utils/      # API Endpoints
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
