# OptiChain Deployment Guide

This guide provides step-by-step instructions for deploying the OptiChain full-stack application.

## Prerequisites

1.  A [GitHub](https://github.com) repository with your code.
2.  A [Render](https://render.com) account (for Backend).
3.  A [Vercel](https://vercel.com) or [Render](https://render.com) account (for Frontend).

---

## 1. Backend Deployment (Render)

### Step 1: Create a New Web Service
1.  Log in to Render and click **New > Web Service**.
2.  Connect your GitHub repository.
3.  Configure the following settings:
    *   **Name**: `optichain-backend`
    *   **Environment**: `Python 3`
    *   **Root Directory**: `backend`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `gunicorn app:app_instance`
    *   **Instance Type**: `Free` (or higher)

### Step 2: Environment Variables
In the **Environment** tab, add:
*   `PYTHON_VERSION`: `3.9.0` (or your preferred version)
*   `DEBUG`: `False`
*   `PORT`: `10000` (Render sets this automatically, but ensure it's there if needed)

### Step 3: Copy the URL
Once deployed, Render will provide a URL like `https://optichain-backend.onrender.com`. **Copy this URL.**

---

## 2. Frontend Deployment (Vercel - Recommended)

### Step 1: Create a New Project
1.  Log in to Vercel and click **Add New > Project**.
2.  Connect your GitHub repository.
3.  Configure the following settings:
    *   **Framework Preset**: `Vite`
    *   **Root Directory**: `./` (Root of the repo)
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`

### Step 2: Environment Variables
Before clicking "Deploy", expand the **Environment Variables** section and add:
*   `VITE_API_URL`: `https://optichain-backend.onrender.com` (Paste your Render backend URL here)

### Step 3: Deploy
Click **Deploy**. Once finished, your site will be live!

---

## 3. Production Best Practices

### API Connection
*   Always use `import.meta.env.VITE_API_URL` in the frontend to avoid hardcoding localhost.
*   Ensure the backend has CORS properly configured (already done in `app.py`).

### Database
*   The current setup uses SQLite or in-memory data. For a real production app, consider using **Render's Managed PostgreSQL** and updating your `DATABASE_URL` in the backend environment variables.

### Monitoring
*   Use Render's build-in logs to monitor backend health.
*   The `/health` endpoint is available at `https://your-backend.onrender.com/health`.
