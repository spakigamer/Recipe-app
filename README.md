# Daffodile

Daffodile is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). It features advanced capabilities including AI-powered content generation, secure authentication, and robust file management.

## Features

- **Frontend**: Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/), utilizing [Ant Design](https://ant.design/) for a polished UI.
- **Backend**: powered by [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).
- **Authentication**: Secure Google OAuth integration.
- **AI Integration**: Leverages Google Gemini, OpenAI, and Replicate for intelligent features.
- **File Management**: Cloudinary integration for efficient image and file storage.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd daffodile
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

## Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
GEMINI_API_KEY=your_gemini_api_key
HUGGINGFACE_API_TOKEN=your_huggingface_token
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Running the Application

1.  **Start the Backend Server:**

    ```bash
    cd backend
    npm start
    # or for development with auto-restart:
    npm run dev
    ```

2.  **Start the Frontend Development Server:**
    ```bash
    cd frontend
    npm run dev
    ```
    The application will typically be accessible at `http://localhost:5173`.

## ⚠️ Important Note: Third-Party Cookies

> **Critical**: This application requires third-party cookies to be enabled in your browser for proper authentication and session management (especially when the backend and frontend are hosted on different domains or ports).
>
> If you experience issues with logging in or maintaining a session:
>
> 1. Check your browser settings and ensure third-party cookies are allowed for this site.
> 2. Disable any ad-blockers or privacy extensions that might be blocking these cookies.
