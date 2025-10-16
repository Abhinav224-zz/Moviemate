# Vercel Deployment Guide

## Quick Deploy Steps

### 1. Deploy Backend (First!)

1. Go to: https://vercel.com/new
2. **Import** your repository: `Abhinav224-zz/Moviemate`
3. Configure project:
   - **Project Name**: `freshbasket-backend` (or your choice)
   - **Framework Preset**: Other
   - **Root Directory**: `backend` ← IMPORTANT!
   - **Build Command**: Leave empty or `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
4. Click **Deploy**
5. ⚠️ **COPY THE DEPLOYMENT URL** (e.g., `https://freshbasket-backend.vercel.app`)

---

### 2. Deploy Frontend (Second!)

1. Go to: https://vercel.com/new again
2. **Import** the SAME repository: `Abhinav224-zz/Moviemate`
3. Configure project:
   - **Project Name**: `freshbasket-frontend` (or your choice)
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` ← IMPORTANT!
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Add Environment Variable** (CRITICAL!):
   - Click "Environment Variables"
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: Paste your backend URL from Step 1 (without trailing slash)
   - Example: `https://freshbasket-backend.vercel.app`
5. Click **Deploy**

---

## ✅ Verification

After both deployments:
1. Visit your **frontend URL** (e.g., `https://freshbasket-frontend.vercel.app`)
2. The app should load and show products from the backend
3. Test login/register functionality

---

## 🔧 If Something Goes Wrong

### Backend Issues:
- Check deployment logs in Vercel dashboard
- Ensure `backend` root directory is set correctly
- Verify `server.js` and `db.json` are present

### Frontend Issues:
- Check if `VITE_API_BASE_URL` environment variable is set
- Verify it points to your backend URL
- Check browser console for CORS or API errors
- Redeploy if needed: Go to Deployments → ... → Redeploy

### Update Environment Variable:
1. Go to your frontend project in Vercel
2. Settings → Environment Variables
3. Edit `VITE_API_BASE_URL` with correct backend URL
4. Redeploy the frontend

---

## 📱 Your Deployed URLs

Backend: `https://freshbasket-backend-[random].vercel.app`
Frontend: `https://freshbasket-frontend-[random].vercel.app`

**Share the Frontend URL** - that's your working e-commerce app!
