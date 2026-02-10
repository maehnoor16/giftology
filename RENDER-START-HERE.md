# 🎯 RENDER DEPLOYMENT - VISUAL QUICK START

## 🎉 Your Current Status

```
✅ FRONTEND
   Status: LIVE on Vercel
   URL: https://giftology.vercel.app

⏳ BACKEND
   Status: Ready to deploy
   Target: Render
   Time needed: ~30 mins
```

---

## 3-Step Render Deployment

### **STEP 1: Database (5 mins)**

```
https://render.com
    ↓
Dashboard → New + → PostgreSQL
    ↓
Name: giftology-db
    ↓
[Create Database]
    ↓
Copy connection string ← SAVE THIS
```

### **STEP 2: Backend Service (10 mins)**

```
Dashboard → New + → Web Service
    ↓
Connect GitHub → giftology repo
    ↓
Fill:
  Name: giftology-backend
  Python 3
  Root: backend-django
    ↓
Add Build/Start Commands
    ↓
Add 5 Environment Variables
    ↓
[Create Web Service]
    ↓
Wait for deployment
    ↓
Get URL: https://giftology-backend.onrender.com
```

### **STEP 3: Connect Frontend (5 mins)**

```
Vercel Dashboard
    ↓
giftology project → Settings
    ↓
Environment Variables
    ↓
Update REACT_APP_API_URL to:
https://giftology-backend.onrender.com/api/
    ↓
Redeploy
```

---

## ⚙️ Environment Variables (Copy These)

```yaml
SECRET_KEY: (from https://djecrety.ir/)
DEBUG: False
DATABASE_URL: postgresql://giftology_user:PASSWORD@dpg-xxxxx.render.internal:5432/giftology
ALLOWED_HOSTS: giftology-backend.onrender.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS: https://giftology.vercel.app,http://localhost:3000
```

---

## 📋 Required Commands

### Build Command:

```bash
pip install -r requirements.txt && cd backend-django && python manage.py migrate && python manage.py collectstatic --noinput
```

### Start Command:

```bash
cd backend-django && gunicorn giftology_backend.wsgi:application --bind 0.0.0.0:$PORT
```

---

## ✅ Verification Checklist

```
After deployment, verify:

□ Backend API responds
  https://giftology-backend.onrender.com/api/products/

□ Admin panel loads
  https://giftology-backend.onrender.com/admin/

□ Frontend loads products
  https://giftology.vercel.app → Shop

□ Auto-fill works
  Login → Add to cart → Checkout → Form auto-fills

□ Order placement works
  Complete checkout → See success message
```

---

## 🎯 Your Final URLs

| Service  | URL                                           |
| -------- | --------------------------------------------- |
| Frontend | https://giftology.vercel.app                  |
| Backend  | https://giftology-backend.onrender.com        |
| API      | https://giftology-backend.onrender.com/api/   |
| Admin    | https://giftology-backend.onrender.com/admin/ |

---

## 📚 Documentation Available

- **RENDER-DEPLOYMENT-GUIDE.md** ← Detailed step-by-step
- **RENDER-QUICK-GUIDE.md** ← Fast checklist
- **STEP-BY-STEP-DEPLOYMENT.md** ← Complete walkthrough

---

## 🚀 Start Now!

1. Open **RENDER-DEPLOYMENT-GUIDE.md**
2. Follow Step 1-10
3. You'll be LIVE in 30 mins!

---

**Let's make your backend LIVE! 💪**
