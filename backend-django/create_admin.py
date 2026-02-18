#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'giftology_backend.settings')

# Setup Django
django.setup()

from django.contrib.auth.models import User

# Delete existing user if it exists
User.objects.filter(username='mahnoor').delete()

# Create superuser
try:
    admin = User.objects.create_superuser(
        username='mahnoor',
        email='mahnoor@gmail.com',
        password='RSCI@29061'
    )
    print(f"✓ Superuser created successfully!")
    print(f"  Username: {admin.username}")
    print(f"  Email: {admin.email}")
    print(f"  Is Staff: {admin.is_staff}")
    print(f"  Is Superuser: {admin.is_superuser}")
except Exception as e:
    print(f"✗ Error creating superuser: {e}")
