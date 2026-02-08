# 🚀 Complete Deployment Guide for Giftology

Deploy your Giftology e-commerce platform on **Render** (Backend) and **Vercel** (Frontend) for free.

---

## 📋 Overview

Your application has 3 parts:

- **Frontend**: React app (deploy to Vercel)
- **Backend**: Django REST API (deploy to Render)
- **Payment Service**: Node.js (optional, can also deploy to Render)

---

## 🎯 Step 1: Prepare Your GitHub Repository

### 1.1 Create a GitHub Repository

```bash
# If you haven't already:
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Create GitHub Repository Online

1. Go to [GitHub.com](https://github.com/new)
2. Name it: `giftology`
3. Keep it public
4. Click **Create repository**

### 1.3 Push Your Code to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/giftology.git
git branch -M main
git push -u origin main
```

---

## 🟢 Step 2: Deploy Django Backend to Render

### 2.1 Create Render Account

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub (easier)
3. Authorize GitHub access

### 2.2 Create PostgreSQL Database

1. From Render dashboard, click **New +** → **PostgreSQL**
2. Fill in:
   - **Name**: `giftology-db`
   - **Database**: `giftology`
   - **User**: `giftology_user`
   - **Region**: Choose closest to you
   - **Plan**: Free tier
3. Click **Create Database**
4. **Copy the Internal Database URL** (you'll need it)

### 2.3 Update Django Settings for Production

**File: `backend-django/giftology_backend/settings.py`**

Update these settings:

```python
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-fallback-key')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Database - Production with PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'giftology'),
        'USER': os.environ.get('DB_USER', 'giftology_user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# CORS Settings
CORS_ALLOWED_ORIGINS = os.environ.get(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:3000,http://127.0.0.1:3000'
).split(',')

# Static Files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

### 2.4 Create Requirements File

**File: `backend-django/requirements.txt`**

```
Django==6.0.1
djangorestframework==3.14.0
django-cors-headers==4.3.1
psycopg2-binary==2.9.9
gunicorn==21.2.0
whitenoise==6.6.0
python-decouple==3.8
```

Run:

```bash
pip freeze > backend-django/requirements.txt
```

### 2.5 Create Render Configuration

**File: `render.yaml`** (in root directory)

```yaml
services:
  - type: web
    name: giftology-backend
    env: python
    plan: free
    buildCommand: |
      pip install --upgrade pip
      pip install -r backend-django/requirements.txt
      cd backend-django && python manage.py migrate
    startCommand: |
      cd backend-django
      gunicorn giftology_backend.wsgi:application --bind 0.0.0.0:$PORT
    envVars:
      - key: SECRET_KEY
        value: your-secret-key-here-change-this
      - key: DEBUG
        value: False
      - key: ALLOWED_HOSTS
        fromDatabase:
          name: giftology-db
          property: hostname
      - key: DATABASE_URL
        fromDatabase:
          name: giftology-db
          property: connectionString
```

### 2.6 Create Django Web Service on Render

1. Go to Render dashboard → **New +** → **Web Service**
2. Connect to GitHub (select your repository)
3. Fill in:
   - **Name**: `giftology-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r backend-django/requirements.txt && cd backend-django && python manage.py migrate && python manage.py collectstatic --noinput`
   - **Start Command**: `cd backend-django && gunicorn giftology_backend.wsgi:application --bind 0.0.0.0:$PORT`
   - **Plan**: Free

4. Click **Advanced** and add environment variables:
   - `SECRET_KEY`: Generate a random string (use Django secret key generator)
   - `DEBUG`: `False`
   - `DB_NAME`: `giftology`
   - `DB_USER`: `giftology_user`
   - `DB_PASSWORD`: (copy from Render database)
   - `DB_HOST`: (copy from Render database)
   - `DB_PORT`: `5432`
   - `CORS_ALLOWED_ORIGINS`: `https://your-frontend-url.vercel.app`

5. Click **Create Web Service**

### 2.7 Note Your Backend URL

Once deployed, you'll get a URL like:

```
https://giftology-backend.onrender.com
```

Keep this for later!

---

## 🔵 Step 3: Deploy React Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to [Vercel.com](https://vercel.com/signup)
2. Sign up with GitHub

### 3.2 Update Frontend API Configuration

**File: `frontend/src/api.ts`**

```typescript
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
```

### 3.3 Create Environment Variables File

**File: `frontend/.env.production`**

```
REACT_APP_API_URL=https://giftology-backend.onrender.com/api/
```

### 3.4 Update Vercel Configuration

**File: `frontend/vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "env": {
    "REACT_APP_API_URL": "@react_app_api_url"
  }
}
```

### 3.5 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import `giftology` repository
4. Fill in:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./frontend`
5. Click **Environment Variables** and add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://giftology-backend.onrender.com/api/`
6. Click **Deploy**

Your frontend will be available at:

```
https://giftology.vercel.app
```

---

## 🟡 Step 4: Deploy Node.js Payment Service (Optional)

### 4.1 Create Another Web Service on Render

1. Go to Render → **New +** → **Web Service**
2. Connect same repository
3. Fill in:
   - **Name**: `giftology-payment`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend-node && npm install`
   - **Start Command**: `cd backend-node && npm start`
   - **Plan**: Free
4. Click **Create**

Payment server URL:

```
https://giftology-payment.onrender.com
```

---

## ✅ Step 5: Complete Configuration & Testing

### 5.1 Update Django CORS Settings

**File: `backend-django/giftology_backend/settings.py`**

```python
CORS_ALLOWED_ORIGINS = [
    'https://giftology.vercel.app',
    'https://www.giftology.vercel.app',
    'http://localhost:3000',
]
```

### 5.2 Create Superuser for Admin

```bash
# In Render deploy logs or SSH
cd backend-django
python manage.py createsuperuser
# Follow prompts
```

Admin panel will be at:

```
https://giftology-backend.onrender.com/admin/
```

### 5.3 Test Your Application

1. Go to `https://giftology.vercel.app`
2. Try to:
   - Register a new user
   - Add products to cart
   - View wishlist
   - Place an order
   - View order history

---

## 🔧 Environment Variables Summary

### Backend (Render)

```
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=giftology-backend.onrender.com
DB_NAME=giftology
DB_USER=giftology_user
DB_PASSWORD=your-db-password
DB_HOST=your-render-db-host
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://giftology.vercel.app
```

### Frontend (Vercel)

```
REACT_APP_API_URL=https://giftology-backend.onrender.com/api/
```

---

## 📊 Live Links

| Service         | URL                                             |
| --------------- | ----------------------------------------------- |
| **Frontend**    | `https://giftology.vercel.app`                  |
| **Backend API** | `https://giftology-backend.onrender.com/api/`   |
| **Admin Panel** | `https://giftology-backend.onrender.com/admin/` |
| **Payment API** | `https://giftology-payment.onrender.com`        |

---

## 🐛 Troubleshooting

### Frontend shows "Cannot connect to API"

- Check `REACT_APP_API_URL` environment variable in Vercel
- Verify CORS settings in Django
- Check backend is running on Render

### Database connection error

- Verify credentials in Render env vars
- Check database is running
- Ensure IP whitelist allows Render

### Static files not loading

- Run `python manage.py collectstatic --noinput`
- Add `whitenoise` middleware in Django

### Deploy fails

- Check logs in Render/Vercel dashboard
- Ensure all dependencies in requirements.txt
- Verify Python/Node versions match

---

## 🔐 Security Checklist

- [ ] Change `SECRET_KEY` to random string
- [ ] Set `DEBUG=False` in production
- [ ] Update `ALLOWED_HOSTS` correctly
- [ ] Update `CORS_ALLOWED_ORIGINS` with your domain
- [ ] Use strong superuser password
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Never commit `.env` files
- [ ] Regenerate SECRET_KEY regularly

---

## 📈 Next Steps

1. **Custom Domain**: Add your custom domain on Vercel/Render
2. **Email Verification**: Add email service for user verification
3. **Payment Gateway**: Integrate real payment processor (Stripe, PayPal)
4. **Analytics**: Add Google Analytics
5. **Database Backup**: Set up automated backups
6. **Monitoring**: Enable uptime monitoring

---

**Happy Deploying! 🚀**
