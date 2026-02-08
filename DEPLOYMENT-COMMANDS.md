# 🎯 Copy-Paste Deployment Commands

Use these commands to deploy quickly. Customize where noted.

---

## 1️⃣ Prepare GitHub Repository

```bash
# Navigate to project
cd d:\Giftology

# Initialize git (if not done)
git init

# Configure git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit: Giftology e-commerce platform"

# Link to GitHub (CUSTOMIZE THIS!)
git remote add origin https://github.com/YOUR_USERNAME/giftology.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Deployment Settings (Already Updated)

These files are already configured:

- ✅ `backend-django/requirements.txt` - Dependencies
- ✅ `render.yaml` - Render configuration
- ✅ `frontend/.env.production` - Frontend API URL
- ✅ `frontend/vercel.json` - Vercel configuration

---

## 3️⃣ Environment Variables for Render

Generate a SECRET_KEY (run locally):

```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Or use online generator: https://djecrety.ir/

Copy-paste into Render:

```
SECRET_KEY=django-insecure-xxxxxxxxxxxxxxxxxxxxxxxxxx
DEBUG=False
ALLOWED_HOSTS=giftology-backend.onrender.com,localhost,127.0.0.1
DATABASE_URL=postgresql://username:password@host:5432/dbname
CORS_ALLOWED_ORIGINS=https://giftology.vercel.app,http://localhost:3000
```

---

## 4️⃣ Create Admin User (After Backend Deploys)

```bash
# In Render Shell (after deployment):
cd backend-django
python manage.py createsuperuser

# Follow prompts:
# Username: admin
# Email: your@email.com
# Password: (strong password)
```

---

## 5️⃣ Update Frontend After Backend Deployed

After Render backend URL is ready (`https://giftology-backend.onrender.com`):

```bash
# Update frontend environment
echo "REACT_APP_API_URL=https://giftology-backend.onrender.com/api/" > frontend/.env.production

# Push to GitHub
cd d:\Giftology
git add .
git commit -m "Update API URL for production backend"
git push origin main

# Vercel auto-redeploys from main branch
```

---

## 6️⃣ Test Deployment Locally

```bash
# Test backend locally
cd backend-django
python manage.py runserver

# Test frontend locally (in new terminal)
cd frontend
npm start

# Visit http://localhost:3000
```

---

## 7️⃣ Live URLs After Deployment

```
Frontend: https://giftology.vercel.app
Backend: https://giftology-backend.onrender.com
API: https://giftology-backend.onrender.com/api/
Admin: https://giftology-backend.onrender.com/admin/
```

---

## 8️⃣ Quick Troubleshooting Commands

```bash
# Check requirements.txt is correct
cat backend-django/requirements.txt

# Verify frontend config
cat frontend/.env.production

# Check Render config
cat render.yaml

# Test Django settings
cd backend-django
python manage.py check

# Test React build
cd frontend
npm run build

# Check git status
git status

# View git log
git log --oneline -5
```

---

## 9️⃣ Useful Render Commands (In Render Shell)

```bash
# Check database connection
python manage.py shell
from django.db import connection
print(connection.get_dsn_params())

# Run migrations
cd backend-django
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Check Django settings
python manage.py check --deploy

# Create test data
python manage.py shell
from store.models import Product
Product.objects.create(name="Test Product", description="...", price=100, image="...", stock=10)
```

---

## 🔟 Useful Vercel Commands (Local)

```bash
# Build frontend locally
cd frontend
npm run build

# Preview build locally
npm install -g serve
serve -s build

# Check environment variables
# Visit: Vercel Dashboard → Project → Settings → Environment Variables
```

---

## 🔐 Security Checklist Commands

```bash
# Generate new SECRET_KEY
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# Verify DEBUG is False in production
grep DEBUG backend-django/giftology_backend/settings.py

# Check ALLOWED_HOSTS is set
grep ALLOWED_HOSTS backend-django/giftology_backend/settings.py

# Verify requirements.txt has all dependencies
cat backend-django/requirements.txt | wc -l
```

---

## 📱 Mobile Test URLs

After deployment, test on mobile:

1. Get your phone IP:

   ```bash
   # On your PC
   ipconfig
   # Look for "IPv4 Address: 192.168.x.x"
   ```

2. Visit on mobile:
   ```
   http://192.168.100.15:3000  (local testing)
   https://giftology.vercel.app (production)
   ```

---

## 🆘 Emergency Commands

If something breaks:

```bash
# Force redeploy on Vercel
# → Go to Settings → Deployments → Redeploy current

# Restart Render service
# → Go to Service → Manual Restart

# Reset database on Render
# → Go to Database → Delete (WARNING: loses all data!)
# → Create new database

# Clear Vercel cache
# → Settings → Deployments → Redeploy → Clear function cache

# Rollback to previous version
git log --oneline
git reset --hard <commit-hash>
git push origin main --force
```

---

## 📊 Monitoring Commands

Check if services are running:

```bash
# Check backend API
curl https://giftology-backend.onrender.com/api/products/

# Check frontend
curl https://giftology.vercel.app -I

# Check admin panel
curl https://giftology-backend.onrender.com/admin/ -I
```

---

## ⚡ Performance Optimization (Optional)

```bash
# Optimize frontend build
cd frontend
npm run build -- --stats
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm build

# Enable gzip compression (Vercel default)
# Already enabled!

# Database connection pooling (Render)
# Already configured with psycopg2!
```

---

**Quick Links:**

- GitHub: https://github.com/YOUR_USERNAME/giftology
- Render: https://render.com/dashboard
- Vercel: https://vercel.com/dashboard
- Django: https://docs.djangoproject.com
- React: https://react.dev

---

**Questions?** Check the other deployment guides:

- `DEPLOYMENT-GUIDE.md` - Detailed walkthrough
- `STEP-BY-STEP-DEPLOYMENT.md` - Visual guide with screenshots
- `DEPLOYMENT-QUICK-GUIDE.md` - Quick reference
