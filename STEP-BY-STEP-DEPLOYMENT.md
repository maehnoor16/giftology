# 📚 Complete Step-by-Step Deployment Instructions

## Table of Contents

1. [Prerequisite Setup](#prerequisite-setup)
2. [Push Code to GitHub](#push-code-to-github)
3. [Deploy Backend (Render)](#deploy-backend-render)
4. [Deploy Frontend (Vercel)](#deploy-frontend-vercel)
5. [Testing & Verification](#testing--verification)

---

## Prerequisite Setup

### Required Accounts

You need free accounts on:

- [GitHub.com](https://github.com) - for code hosting
- [Render.com](https://render.com) - for backend
- [Vercel.com](https://vercel.com) - for frontend

### Required Tools (Local)

```bash
git --version          # Should show git version
npm --version          # Should show npm version
python --version       # Should show Python 3.9+
```

---

## Push Code to GitHub

### Step 1: Initialize Git (if not done)

```bash
cd d:\Giftology
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Giftology e-commerce platform"
```

### Step 2: Create GitHub Repository

1. Open [GitHub.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: `giftology`
   - **Description**: Giftology E-Commerce Platform
   - **Public** (select this)
   - **Initialize with README** (uncheck, we have one)
3. Click **Create repository**

### Step 3: Link Local Repo to GitHub

Copy the commands from GitHub and run locally:

```bash
cd d:\Giftology
git remote add origin https://github.com/YOUR_USERNAME/giftology.git
git branch -M main
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## Deploy Backend (Render)

### Step 1: Create Render Account

1. Go to [Render.com](https://render.com)
2. Click **Sign up**
3. Select **Continue with GitHub**
4. Authorize Giftology access

### Step 2: Create PostgreSQL Database

1. From Render dashboard, click **New +** button
2. Select **PostgreSQL**
3. Fill in the form:
   - **Name**: `giftology-db`
   - **Database**: `giftology`
   - **User**: `giftology_user`
   - **Region**: Select closest to your location
   - **PostgreSQL Version**: 15 (latest)
   - **Plan**: Free
4. Click **Create Database**
5. **Wait for creation** (1-2 minutes)
6. Once created, you'll see connection info:
   ```
   Server: dpg-xxxx.render.internal
   Port: 5432
   Database: giftology
   User: giftology_user
   Password: xxxxxxxx
   ```
7. **Copy the connection string** (looks like):
   ```
   postgresql://giftology_user:PASSWORD@dpg-xxxx.render.internal:5432/giftology
   ```

### Step 3: Create Web Service for Backend

1. From Render dashboard, click **New +**
2. Select **Web Service**
3. Connect GitHub:
   - Click **Connect account** if needed
   - Find and select `giftology` repository
4. Fill in Service Details:

   ```
   Name: giftology-backend
   Region: (same as database)
   Branch: main
   Runtime: Python 3
   Build Command:
     pip install -r backend-django/requirements.txt &&
     cd backend-django &&
     python manage.py migrate &&
     python manage.py collectstatic --noinput

   Start Command:
     cd backend-django &&
     gunicorn giftology_backend.wsgi:application --bind 0.0.0.0:$PORT

   Plan: Free
   ```

5. Click **Advanced** to add Environment Variables:
   - Add each one individually by clicking **Add Environment Variable**

   | Key                    | Value                                                |
   | ---------------------- | ---------------------------------------------------- |
   | `SECRET_KEY`           | Generate random: [Use this](https://djecrety.ir/)    |
   | `DEBUG`                | `False`                                              |
   | `DATABASE_URL`         | Paste PostgreSQL connection string                   |
   | `CORS_ALLOWED_ORIGINS` | `https://giftology.vercel.app,http://localhost:3000` |

6. Click **Create Web Service**
7. **Wait for deployment** (5-10 minutes)
   - Watch the build logs
   - Should say "Deployed" when done

8. **Copy your Backend URL**:
   - Format: `https://giftology-backend.onrender.com`
   - Save this for next step!

✅ **Backend is deployed!**

---

## Deploy Frontend (Vercel)

### Step 1: Update Environment Variables

Edit `frontend/.env.production`:

```env
REACT_APP_API_URL=https://giftology-backend.onrender.com/api/
```

(Replace with your actual Render backend URL)

### Step 2: Push Updated Code

```bash
cd d:\Giftology
git add .
git commit -m "Update API endpoint for production"
git push origin main
```

### Step 3: Create Vercel Account

1. Go to [Vercel.com/signup](https://vercel.com/signup)
2. Click **Continue with GitHub**
3. Authorize and allow access

### Step 4: Deploy on Vercel

1. From Vercel dashboard, click **Add New** → **Project**
2. **Select Repository**:
   - Find `giftology` in the list
   - Click **Import**
3. **Configure Project**:
   - **Project Name**: `giftology`
   - **Framework Preset**: Create React App
   - **Root Directory**: `./frontend`
   - **Node.js Version**: 18.x
4. Click **Environment Variables**
5. Add Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://giftology-backend.onrender.com/api/`
   - Click **Add**
6. Click **Deploy**
7. **Wait for deployment** (2-3 minutes)
   - Shows progress bar
   - Should show "Congratulations!" when done

8. **Get your Frontend URL**:
   - Format: `https://giftology.vercel.app`
   - Click **Visit** to open in browser

✅ **Frontend is deployed!**

---

## Testing & Verification

### Step 1: Create Admin User

1. Go to Render → Select `giftology-backend`
2. Click **Shell** in top right
3. Run these commands:
   ```bash
   cd backend-django
   python manage.py createsuperuser
   ```
4. Enter:
   - **Username**: `admin`
   - **Email**: your@email.com
   - **Password**: (create strong password)
   - **Confirm Password**: (repeat)

### Step 2: Test Backend API

Open in browser:

```
https://giftology-backend.onrender.com/api/products/
```

Should show JSON list of products

### Step 3: Test Frontend

1. Go to `https://giftology.vercel.app`
2. Should load without errors
3. Try these actions:
   - Click **Shop** → Browse products
   - Click **Register** → Create account
   - Click **Login** → Login with account
   - Click on a product → Add to Cart
   - Click **Cart** icon → View cart
   - Click **Checkout** → Should show prefilled form (if logged in)

### Step 4: Test Full Flow

1. **Add to Cart**:
   - Browse products
   - Click "Add to Cart"
   - See cart update

2. **View Wishlist**:
   - Click heart icon on product
   - Go to Wishlist page

3. **Checkout**:
   - View cart
   - Click "Checkout"
   - Form should auto-fill if logged in
   - Click "Place Order"
   - Should see success message

4. **View Orders**:
   - Click **Orders** in navbar
   - See your order history

✅ **Everything works!**

---

## Troubleshooting

### Issue: "Failed to fetch API"

**Solution**:

```
1. Check REACT_APP_API_URL in Vercel env vars
2. Verify backend is running on Render
3. Wait 30 secs (free tier slow startup)
4. Clear browser cache (Ctrl+Shift+Delete)
```

### Issue: "Database connection error"

**Solution**:

```
1. Check DATABASE_URL in Render env vars
2. Verify PostgreSQL is running
3. Redeploy backend service
```

### Issue: "404 not found"

**Solution**:

```
1. For frontend: Page refresh (Vercel routing)
2. For API: Check endpoint name in backend/store/urls.py
```

### Issue: "CORS error in browser"

**Solution**:

```
1. Update CORS_ALLOWED_ORIGINS in Django
2. Include your Vercel URL exactly
3. Redeploy backend
```

### Issue: "Static files not loading"

**Solution**:

```bash
# In Render shell:
cd backend-django
python manage.py collectstatic --noinput
```

---

## Final URLs

After successful deployment:

| Service         | URL                                             |
| --------------- | ----------------------------------------------- |
| **🎨 Frontend** | `https://giftology.vercel.app`                  |
| **🔌 API**      | `https://giftology-backend.onrender.com/api/`   |
| **👨‍💼 Admin**    | `https://giftology-backend.onrender.com/admin/` |

---

## Performance Notes (Free Tier)

### Render Free Tier

- ⏸️ Spins down after 15 mins inactivity
- 🔄 First request takes ~30 seconds
- 📊 Upgrade to Hobby Plan ($7/mo) for always-on

### Vercel Free Tier

- ⚡ Always running, no spin-down
- 📈 100GB bandwidth/month
- ♾️ Unlimited builds

---

## Optional: Custom Domain

### Add Custom Domain (Vercel)

1. Vercel Dashboard → Select Project
2. Settings → Domains
3. Enter your domain (e.g., `giftology.com`)
4. Follow DNS instructions from your registrar
5. DNS propagation: 24-48 hours

### Add Custom Domain (Render)

1. Render Dashboard → Select Backend
2. Settings → Custom Domain
3. Enter your domain
4. Update DNS records

---

**Congratulations! Your app is live! 🎉**

Next: Configure custom domain, add payment processing, enable email notifications.
