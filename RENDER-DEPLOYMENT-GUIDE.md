# 🟢 RENDER DEPLOYMENT - COMPLETE STEP-BY-STEP GUIDE

Great that your **Vercel frontend is LIVE**! 🎉 Now let's deploy your backend to Render.

---

## 📋 Overview

Render will host:

- ✅ Django REST API backend
- ✅ PostgreSQL database
- ✅ Auto-deploy when you push to GitHub

---

## 🚀 STEP 1: Create Render Account

1. Go to **https://render.com**
2. Click **Sign Up**
3. Choose **Sign up with GitHub** (easiest)
4. Click **Authorize render-oss**
5. Complete any verification
6. You're in! ✓

---

## 🗄️ STEP 2: Create PostgreSQL Database

This creates your production database.

### 2.1 Go to Dashboard

- Click **Dashboard** (after login)
- Click **New +** button (top right)
- Select **PostgreSQL**

### 2.2 Fill in Database Details

```
Name:              giftology-db
Database:          giftology
User:              giftology_user
Region:            Choose closest to you
PostgreSQL Version: 15 (latest)
Plan:              Free
```

### 2.3 Create Database

- Click **Create Database**
- Wait 1-2 minutes for creation
- You'll see: "Your database is running" ✓

### 2.4 Save Connection Details

Once created, you'll see connection info. **Copy these values:**

```
Server:     dpg-xxxxx.render.internal
Port:       5432
Database:   giftology
User:       giftology_user
Password:   xxxxxxxxxxxxxxxx
```

**IMPORTANT:** The connection string looks like:

```
postgresql://giftology_user:PASSWORD@dpg-xxxxx.render.internal:5432/giftology
```

Write this down! You need it in the next step. 📝

---

## 🐍 STEP 3: Create Web Service for Django Backend

This runs your Python/Django app.

### 3.1 Go to Dashboard & Create Service

1. Click **Dashboard**
2. Click **New +** button
3. Select **Web Service**

### 3.2 Connect GitHub Repository

1. Click **Connect account** (if first time)
2. Find your **giftology** repository
3. Click to select it
4. Click **Connect**

### 3.3 Configure Service Details

Fill in these fields:

```
Name:               giftology-backend
Environment:        Python 3
Region:             (same as database)
Branch:             main
Root Directory:     backend-django
```

### 3.4 Build Command

Copy-paste this exactly:

```
pip install -r requirements.txt && python manage.py migrate && python manage.py create_superuser && python manage.py collectstatic --noinput
```

**What it does:**

1. Installs all Python packages
2. Runs database migrations
3. Collects static files

⚠️ **IMPORTANT:** Do NOT include `cd backend-django` in this command! Render already navigates to your Root Directory automatically.

### 3.5 Start Command

Copy-paste this exactly:

```
gunicorn giftology_backend.wsgi:application --bind 0.0.0.0:$PORT
```

**What it does:**

- Starts the app using Gunicorn
- Listens on the port Render provides

⚠️ **IMPORTANT:** Do NOT include `cd backend-django` in this command! Render already navigates to your Root Directory automatically.

### 3.6 Select Plan

- Choose **Free** plan
- (Can upgrade to Hobby $7/mo later for always-on)

### 3.7 Click **Advanced** to Add Environment Variables

Click the **Advanced** button to see environment variables section.

---

## 🔐 STEP 4: Add Environment Variables

These are your app's configuration.

### Important Environment Variables to Add:

Click **Add Environment Variable** for each one:

#### 1. SECRET_KEY

```
Key:    SECRET_KEY
Value:  (generate new using: https://djecrety.ir/)
```

**Why:** Django security key - must be random

#### 2. DEBUG

```
Key:    DEBUG
Value:  False
```

**Why:** Production mode - no detailed error pages

#### 3. DATABASE_URL

```
Key:    DATABASE_URL
Value:  postgresql://giftology_user:PASSWORD@dpg-xxxxx.render.internal:5432/giftology
```

**Why:** Connect to PostgreSQL database

Replace:

- `PASSWORD` with the password from Step 2
- `dpg-xxxxx` with your actual server

#### 4. ALLOWED_HOSTS

```
Key:    ALLOWED_HOSTS
Value:  giftology-backend.onrender.com,localhost,127.0.0.1
```

**Why:** Only these domains can access your app

#### 5. CORS_ALLOWED_ORIGINS

```
Key:    CORS_ALLOWED_ORIGINS
Value:  https://giftology.vercel.app,http://localhost:3000
```

**Why:** Allow frontend to make API calls

- First URL is your Vercel frontend
- Second is for local testing

#### 6. ADMIN_EMAIL (For Superuser)

```
Key:    ADMIN_EMAIL
Value:  mahnoor@email.com
```

**Why:** Email for the admin account that will be auto-created

#### 7. ADMIN_USERNAME (For Superuser)

```
Key:    ADMIN_USERNAME
Value:  mahnoor
```

**Why:** Username for the admin account that will be auto-created

#### 8. ADMIN_PASSWORD (For Superuser)

```
Key:    ADMIN_PASSWORD
Value:  RSCI@29061
```

**Why:** Password for the admin account that will be auto-created

⚠️ **IMPORTANT:** This creates the superuser during build! Render runs `python manage.py create_superuser` automatically.

### Complete Environment Variables Summary

| Variable               | Value          | Example                          |
| ---------------------- | -------------- | -------------------------------- |
| `SECRET_KEY`           | Generate new   | `django-insecure-xyz123abc...`   |
| `DEBUG`                | False          | `False`                          |
| `DATABASE_URL`         | PostgreSQL URL | `postgresql://user:pass@host/db` |
| `ALLOWED_HOSTS`        | Render domain  | `giftology-backend.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | Vercel URL     | `https://giftology.vercel.app`   |
| `ADMIN_EMAIL`          | Your email     | `mahnoor@email.com`              |
| `ADMIN_USERNAME`       | Your username  | `mahnoor`                        |
| `ADMIN_PASSWORD`       | Strong pass    | `RSCI@29061`                     |

---

## ▶️ STEP 5: Deploy

### 5.1 Review Everything

Before deploying, verify:

- ✓ Repository: giftology
- ✓ Branch: main
- ✓ Root Directory: backend-django
- ✓ Build Command: (copied correctly)
- ✓ Start Command: (copied correctly)
- ✓ All Environment Variables: (all 5 added)

### 5.2 Create Web Service

Click **Create Web Service** button at bottom

### 5.3 Watch Deployment

- You'll see logs appear
- Building phase: "Installing dependencies..."
- Deployment phase: "Your service is live"

**This takes 5-10 minutes** ⏳

### 5.4 Get Your Backend URL

Once deployed, you'll see:

```
https://giftology-backend.onrender.com
```

**Copy this URL!** You'll need it. 📌

---

## 🧪 STEP 6: Test Your Backend

### 6.1 Test API Endpoint

Open in browser:

```
https://giftology-backend.onrender.com/api/products/
```

You should see JSON data like:

```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 100,
    ...
  }
]
```

✅ **If you see data, backend is working!**

### 6.2 Test Admin Panel

Go to:

```
https://giftology-backend.onrender.com/admin/
```

You should see Django admin login page. ✅

---

## 👨‍💼 STEP 7: Create Admin User

You need to create a superuser to access admin panel.

### 7.1 Open Render Shell

1. Go to your service dashboard
2. Click **Shell** button (top right)
3. You now have command access to your server

### 7.2 Create Superuser

Run this command in the shell:

```bash
cd backend-django
python manage.py createsuperuser
```

### 7.3 Follow Prompts

```
Username: admin
Email: your@email.com
Password: (create strong password)
Password (again): (repeat)
```

✓ Superuser created!

### 7.4 Login to Admin

1. Go to: `https://giftology-backend.onrender.com/admin/`
2. Username: `admin`
3. Password: (the one you just created)
4. You're in! 🎉

---

## 📦 STEP 8: Add Products via Admin

Now populate your database with products.

### 8.1 In Admin Panel

1. Click **Products**
2. Click **Add Product**

### 8.2 Fill in Product Details

```
Name:        Example Gift
Description: Great gift for someone special
Price:       99.99
Image:       https://example.com/image.jpg
Stock:       10
```

### 8.3 Save

- Click **Save** button
- Product is now in database ✓

Add 5-10 test products for testing.

---

## 🔗 STEP 9: Connect Frontend to Backend

Your frontend needs to know your backend URL.

### 9.1 Update Frontend Environment Variables

In Vercel dashboard:

1. Go to your project **giftology**
2. Click **Settings**
3. Click **Environment Variables**
4. Find `REACT_APP_API_URL`
5. Change value to:

```
https://giftology-backend.onrender.com/api/
```

6. Click **Save**

### 9.2 Redeploy Frontend

1. Go to **Deployments**
2. Click **Redeploy**
3. Frontend updates with new backend URL

---

## ✅ STEP 10: Test Full Application

Now test everything together!

### 10.1 Test Frontend Connection

1. Go to: `https://giftology.vercel.app`
2. Should load without errors ✓

### 10.2 Test Product Loading

1. Go to **Shop**
2. Should see your products from database ✓

### 10.3 Test User Registration

1. Click **Register**
2. Create new account
3. Should work! ✓

### 10.4 Test Login

1. Go to **Login**
2. Login with account
3. Should work! ✓

### 10.5 Test Auto-fill Checkout

1. Login
2. Go to Shop
3. Click product
4. Click **Add to Cart**
5. Click **Checkout**
6. **Form should auto-fill with your info!** ✨

### 10.6 Test Order Placement

1. Click **Place Order**
2. Should see success message ✓
3. Go to **Orders** - see your order ✓

---

## 🎯 Summary of URLs

After all steps, you have:

| Service         | URL                                           | Status  |
| --------------- | --------------------------------------------- | ------- |
| **Frontend**    | https://giftology.vercel.app                  | ✅ LIVE |
| **Backend API** | https://giftology-backend.onrender.com/api/   | ✅ LIVE |
| **Admin Panel** | https://giftology-backend.onrender.com/admin/ | ✅ LIVE |
| **GitHub**      | https://github.com/YOUR_USERNAME/giftology    | ✅ LIVE |

---

## 🔍 Troubleshooting

### Problem: Build fails with "ModuleNotFoundError"

**Solution:** Check that `requirements.txt` has all dependencies

```bash
cd backend-django
pip freeze > requirements.txt  # Update locally first
git add requirements.txt
git push origin main  # Push changes
```

### Problem: "Cannot connect to database"

**Solution:** Verify DATABASE_URL in Render env vars

- Check PostgreSQL is running
- Copy full connection string correctly
- No typos in password

### Problem: "CORS error" in browser console

**Solution:** Update CORS_ALLOWED_ORIGINS in Render

- Make sure Vercel URL is exact: `https://giftology.vercel.app`
- Restart service (Service → Manual Restart)

### Problem: Frontend shows API 404 errors

**Solution:**

- Verify REACT_APP_API_URL in Vercel is correct
- Check backend URL in frontend code
- Redeploy frontend

### Problem: Admin login not working

**Solution:**

- Make sure you created superuser (Step 7)
- Check password is correct
- Try clearing browser cache

### Problem: Static files (CSS/images) not loading

**Solution:**

- Render auto-collects static files
- If still missing, run in Render shell:

```bash
cd backend-django
python manage.py collectstatic --noinput
```

---

## ⏱️ How Long Everything Takes

| Step               | Time        |
| ------------------ | ----------- |
| Create account     | 5 min       |
| Create database    | 5 min       |
| Create web service | 2 min       |
| Add env variables  | 3 min       |
| Deploy             | 5-10 min    |
| Create superuser   | 2 min       |
| Add products       | 10 min      |
| Total              | ~30-40 mins |

---

## 🎉 Success Checklist

- [x] Render account created
- [x] PostgreSQL database created
- [x] Web service created
- [x] Environment variables added
- [x] Backend deployed
- [x] Admin user created
- [x] Products added
- [x] Frontend connected
- [x] Full workflow tested

**YOU'RE DONE! 🚀**

---

## 📚 Next Steps

1. **Monitor logs** - Check Render dashboard regularly
2. **Add more products** - Grow your catalog
3. **Get custom domain** - (Optional, ~$15/year)
4. **Integrate payment** - (Optional, Stripe/PayPal)
5. **Setup email** - (Optional, verify users)

---

## 🔗 Useful Links

- **Render Dashboard**: https://render.com/dashboard
- **Your Backend Service**: https://render.com/dashboard (find it in list)
- **PostgreSQL Database**: https://render.com/dashboard (find it in list)
- **Admin Panel**: https://giftology-backend.onrender.com/admin/
- **GitHub Repo**: https://github.com/YOUR_USERNAME/giftology

---

**Congratulations! Your full-stack app is now LIVE! 🌍**

Your **Giftology** platform is accessible worldwide! 🎁
