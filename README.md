# FreshBasket E-Commerce Platform

A full-stack e-commerce application built with React (frontend) and JSON Server (backend).

## Project Structure

```
freshbasket/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vercel.json
└── backend/           # JSON Server backend
    ├── server.js
    ├── db.json
    ├── package.json
    └── vercel.json
```

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

## Deployment

### Deploy to Vercel

#### Backend Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
5. Click "Deploy"
6. Copy the deployed backend URL (e.g., `https://your-backend.vercel.app`)

#### Frontend Deployment
1. Go to Vercel Dashboard
2. Click "Add New" → "Project"
3. Import the same GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: Your backend URL (e.g., `https://your-backend.vercel.app`)
6. Click "Deploy"

## Environment Variables

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000
```

For production, set `VITE_API_BASE_URL` to your deployed backend URL in Vercel.

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios
- Material-UI
- Bootstrap 5
- Vite

### Backend
- Node.js
- JSON Server
- CORS

## License
MIT
