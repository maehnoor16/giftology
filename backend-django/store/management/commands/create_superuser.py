from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Creates a superuser automatically if one does not exist'

    def handle(self, *args, **options):
        # Check if any superuser exists
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(self.style.SUCCESS('✓ SuperUser already exists'))
            return

        try:
            # Try to get credentials from environment variables
            username = os.getenv('ADMIN_USERNAME', 'mahnoor')
            email = os.getenv('ADMIN_EMAIL', 'mahnoor@email.com')
            password = os.getenv('ADMIN_PASSWORD', 'RSCI@29061')
            
            # Ensure we have valid credentials
            if not username or not password:
                self.stdout.write(self.style.WARNING('⚠ ADMIN_USERNAME or ADMIN_PASSWORD not set'))
                return
            
            # Create the superuser
            admin = User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(self.style.SUCCESS(f'✓ Superuser created successfully!'))
            self.stdout.write(f'  Username: {admin.username}')
            self.stdout.write(f'  Email: {admin.email}')
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'✗ Error creating superuser: {str(e)}'))
