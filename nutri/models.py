from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.conf import settings

class CustomUserManager(BaseUserManager):
    """
    Custom manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    """
    Custom User model for VB Labs' Nutri App.
    """
    username = None # Remove username field
    email = models.EmailField("email address", unique=True)

    USERNAME_FIELD = "email" # Use email to log in
    REQUIRED_FIELDS = [] # Email & Password are required by default

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    done = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title


class Nutritionist(models.Model):
    
    license_number = models.IntegerField()
    
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="nutritionist_profile"
    )

    def __str__(self):
        return f"{self.surname}, {self.name}"
    
class Patient(models.Model):
    """
    The 'Patient' object represents the medical record.
    It can exist without a linked User account initially.
    """
    
    nutritionist = models.ForeignKey(
        Nutritionist, 
        on_delete=models.CASCADE, 
        related_name="patients"
    )
    
    # Basic info provided by the nutritionist
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    
    
    # Optional link to a real User account
    user_account = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name="patient_records" 
    )
    

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"
    
    
class Measurement(models.Model):
    
    recorded_at = models.DateTimeField(auto_now_add=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2) # e.g. 75.50
    height = models.DecimalField(max_digits=3, decimal_places=2) # e.g. 1.82
    waist_circumference = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    notes = models.TextField(blank=True)
    
    patient = models.ForeignKey(
        Patient, 
        on_delete=models.CASCADE, 
        related_name="measurements"
    )
        

    
     

# Create your models here.
