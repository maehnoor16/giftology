# ⚡ RENDER DEPLOYMENT - QUICK CHECKLIST

## 🚀 Fast Track to Live Backend (30 mins)

---

## ✅ Pre-Deployment Checklist

- [ ] GitHub account with giftology repo (you have this ✓)
- [ ] Vercel frontend deployed (you have this ✓)
- [ ] Code pushed to GitHub main branch
- [ ] `requirements.txt` updated with all dependencies
- [ ] `render.yaml` in root directory

---

## 📋 Step-by-Step Checklist

### **PART 1: Account Setup (5 mins)**

```
□ Go to https://render.com
□ Click "Sign Up"
□ Sign up with GitHub
□ Authorize access
□ Login to Render dashboard
```

### **PART 2: Create Database (5 mins)**

```
□ Click "New +"
□ Select "PostgreSQL"
□ Name: giftology-db
□ Database: giftology
□ User: giftology_user
□ Region: (closest to you)
□ Plan: Free
□ Click "Create Database"
□ Wait for creation (1-2 mins)
□ COPY these credentials:
   - Server: dpg-xxxxx.render.internal
   - Port: 5432
   - User: giftology_user
   - Password: xxxxx
□ Save connection string
```

### **PART 3: Create Web Service (2 mins)**

```
□ Click "New +"
□ Select "Web Service"
□ Connect GitHub (select giftology repo)
□ Fill in:
  - Name: giftology-backend
  - Environment: Python 3
  - Region: (same as database)
  - Branch: main
  - Root Directory: backend-django
□ Continue to build settings
```

### **PART 4: Build & Start Commands (1 min)**

```
Build Command:
□ Copy-paste:
pip install -r requirements.txt && python manage.py migrate && python manage.py create_superuser && python manage.py collectstatic --noinput

Start Command:
□ Copy-paste:
gunicorn giftology_backend.wsgi:application --bind 0.0.0.0:$PORT

Plan:
□ Select "Free"
```

⚠️ IMPORTANT: Do NOT include "cd backend-django" in commands!
Render already navigates to the Root Directory automatically.

### **PART 5: Environment Variables (3 mins)**

```
Click "Advanced" then add each:

□ SECRET_KEY
  Value: (from https://djecrety.ir/)

□ DEBUG
  Value: False

□ DATABASE_URL
  Value: postgresql://giftology_user:PASSWORD@dpg-xxxxx.render.internal:5432/giftology
  (Replace PASSWORD and dpg-xxxxx)

□ ALLOWED_HOSTS
  Value: giftology-backend.onrender.com,localhost,127.0.0.1

□ CORS_ALLOWED_ORIGINS
  Value: https://giftology.vercel.app,http://localhost:3000

□ ADMIN_EMAIL
  Value: mahnoor@gmail.com

□ ADMIN_USERNAME
  Value: mahnoor

□ ADMIN_PASSWORD
  Value: RSCI@29061
```

### **PART 6: Deploy (5-10 mins)**

```
□ Review all settings
□ Click "Create Web Service"
□ Watch build logs
□ Wait for "Your service is live" message
□ COPY your backend URL:
   https://giftology-backend.onrender.com
```

### **PART 7: Create Admin User (2 mins)**

```
□ Click "Shell" button in service
□ Run: cd backend-django && python manage.py createsuperuser
□ Username: admin
□ Email: your@email.com
□ Password: (strong password)
□ Confirm password
```

### **PART 8: Update Frontend (1 min)**

```
□ Go to Vercel dashboard
□ Select giftology project
□ Settings → Environment Variables
□ Update REACT_APP_API_URL:
   https://giftology-backend.onrender.com/api/
□ Redeploy frontend
```

### **PART 9: Test Everything (5 mins)**

```
□ Check API: https://giftology-backend.onrender.com/api/products/
  (Should show JSON data)
□ Check Admin: https://giftology-backend.onrender.com/admin/
  (Should show login page)
□ Open frontend: https://giftology.vercel.app
  (Should load products from API)
□ Test register: Create new account
□ Test login: Login with account
□ Test checkout: Form should auto-fill!
```

---

## 📊 Your Live URLs

```
✅ Frontend:   https://giftology.vercel.app
✅ API:        https://giftology-backend.onrender.com/api/
✅ Admin:      https://giftology-backend.onrender.com/admin/
```

---

## 🔐 Environment Variables Reference

### Copy-Paste Format

Create a `.env.render` file locally to keep track:

```
SECRET_KEY=your-generated-key-here
DEBUG=False
DATABASE_URL=postgresql://giftology_user:PASSWORD@dpg-xxxxx.render.internal:5432/giftology
ALLOWED_HOSTS=giftology-backend.onrender.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://giftology.vercel.app,http://localhost:3000
```

---

## 🆘 Quick Troubleshooting

| Problem                  | Fix                                      |
| ------------------------ | ---------------------------------------- |
| Build fails              | Check requirements.txt has all packages  |
| Can't connect to DB      | Verify DATABASE_URL in env vars          |
| CORS error               | Update CORS_ALLOWED_ORIGINS              |
| Admin won't load         | Make sure you created superuser in shell |
| API returns 404          | Check ALLOWED_HOSTS in env vars          |
| Frontend can't reach API | Verify REACT_APP_API_URL in Vercel       |

---

## ⏱️ Total Time Estimate

| Task               | Time         |
| ------------------ | ------------ |
| Setup account      | 5 min        |
| Create database    | 5 min        |
| Create web service | 2 min        |
| Add env variables  | 3 min        |
| Deploy backend     | 10 min       |
| Create admin user  | 2 min        |
| Update frontend    | 1 min        |
| Testing            | 5 min        |
| **TOTAL**          | **~33 mins** |

---

## ✨ Success Indicators

✅ Render account created  
✅ PostgreSQL database running  
✅ Web service deployed  
✅ Backend URL accessible  
✅ Admin panel works  
✅ Frontend loads products  
✅ Auto-fill checkout works  
✅ Orders save to database

**All checked = LIVE! 🎉**

---

## 🔗 Quick Links

- Render Dashboard: https://render.com/dashboard
- Generate Secret Key: https://djecrety.ir/
- Django Docs: https://docs.djangoproject.com
- Your Backend: https://giftology-backend.onrender.com

---

**Congratulations! Your backend is LIVE! 🚀**
