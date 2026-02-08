# ⚡ Quick Deployment Checklist

## Before You Deploy

- [ ] Push all changes to GitHub
- [ ] Test locally: `npm start` (frontend), `python manage.py runserver` (backend)
- [ ] Update `.env.production` with correct API URL

---

## 🟢 Deploy Backend to Render (5 mins)

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. **Create PostgreSQL Database**:
   - New → PostgreSQL
   - Name: `giftology-db`
   - Region: Closest to you
   - Copy the **Internal Database URL**

4. **Create Web Service**:
   - New → Web Service
   - Select your GitHub repo
   - Name: `giftology-backend`
   - Runtime: `Python 3`
   - Build Command:
     ```
     pip install -r backend-django/requirements.txt && cd backend-django && python manage.py migrate && python manage.py collectstatic --noinput
     ```
   - Start Command:
     ```
     cd backend-django && gunicorn giftology_backend.wsgi:application --bind 0.0.0.0:$PORT
     ```
   - **Environment Variables** (Add these):
     ```
     SECRET_KEY = (generate random string)
     DEBUG = False
     DATABASE_URL = (paste from database connection string)
     CORS_ALLOWED_ORIGINS = https://giftology.vercel.app,http://localhost:3000
     ```
   - Click **Create Web Service**

5. **Wait for deployment** (5-10 minutes)
6. **Copy the URL**: `https://giftology-backend.onrender.com`

---

## 🔵 Deploy Frontend to Vercel (3 mins)

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. **Create Project**:
   - Add New → Project
   - Select `giftology` repo
   - Framework: Create React App
   - Root Directory: `./frontend`
   - **Environment Variables**:
     ```
     REACT_APP_API_URL = https://giftology-backend.onrender.com/api/
     ```
   - Click **Deploy**

4. **Wait for deployment** (2-3 minutes)
5. **Your app is live!**: `https://giftology.vercel.app`

---

## 🧪 Test Your Deployment

1. Open `https://giftology.vercel.app`
2. Try to **Register** → Create new account
3. **Login** with your account
4. **Add to Cart** → Product → Add to cart
5. **Checkout** → Fill form → Place order
6. **View Orders** → Check order history

---

## 📊 Your Live URLs

| Service     | URL                                             |
| ----------- | ----------------------------------------------- |
| Frontend    | `https://giftology.vercel.app`                  |
| Backend API | `https://giftology-backend.onrender.com/api/`   |
| Admin Panel | `https://giftology-backend.onrender.com/admin/` |

---

## 🔧 Generate Django Secret Key

Option 1 - Python:

```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

Option 2 - Online: Use [this generator](https://djecrety.ir/)

---

## ⚠️ Common Issues

### "Cannot connect to API"

- Verify `REACT_APP_API_URL` in Vercel env vars
- Check CORS in Django: `CORS_ALLOWED_ORIGINS`
- Restart Vercel deployment

### "Database connection error"

- Check DATABASE_URL in Render env vars
- Verify PostgreSQL is running
- Test connection string

### "Static files not found"

- Run migrations: `python manage.py migrate`
- Collect statics: `python manage.py collectstatic`
- Already done in Render build command

### Deploy keeps failing

- Check Render/Vercel **build logs**
- Ensure all dependencies in `requirements.txt`
- Verify Python version (3.9+)

---

## 🔐 After Deployment

1. **Create admin user**:

   ```bash
   # In Render logs/console
   cd backend-django
   python manage.py createsuperuser
   ```

2. **Access admin**: `https://giftology-backend.onrender.com/admin/`

3. **Add products** to database via admin panel

4. **Update SECRET_KEY** for production

---

## 📱 Keep Apps Running Free

- **Render**: Spins down after 15 mins inactivity (free tier)
  - First request takes 30 secs to wake up
  - Upgrade to Hobby plan ($7/mo) for always-on

- **Vercel**: Always running, no spin-down

---

## 🚀 Next Steps

1. Buy custom domain (`yourname.com`)
2. Configure domain on Vercel → Settings → Domains
3. Add payment gateway (Stripe/PayPal)
4. Enable email verification
5. Set up monitoring & alerts

---

**Need Help?** Check DEPLOYMENT-GUIDE.md for detailed steps
