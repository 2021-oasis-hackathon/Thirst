from django.db import models
from django.contrib.auth.models import AbstractUser,UserManager
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from thirst_backend.func import user_image_path
# Create your models here.

class UserManager(UserManager):
    def create_user(self,username, name, phone, email=None, password=None, **extra_fields):
        email=self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            name=name,
            phone=phone,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, name, phone, email=None, password=None, **extra_fields):
        
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_staff',True)

        return self.create_user(username, name, phone, email, password, **extra_fields)


class User(AbstractUser):
    class Types(models.TextChoices):
        OWNER='OWNER','Owner'
        CUSTOMER='CUSTOMER','Customer'
        ADMIN='ADMIN','Admin'

    type =models.CharField(
        _('Type'),max_length=50,
        choices=Types.choices,
        # default=Types.CUSTOMER
    )
    name = models.CharField(max_length=100,unique=True)
    phone = models.CharField(max_length=13,validators=[RegexValidator(regex = r'[^0-9]*$')])
    credit = models.PositiveIntegerField(default=0)
    profile_img=models.ImageField(default='user_profile/user_default.jpg',upload_to=user_image_path)

    objects=UserManager()

    REQUIRED_FIELDS=['type','phone','name']


class OwnerManager(models.Manager):
    def get_queryset(self, *args, **extra_fields):
        return super().get_queryset( *args, **extra_fields).filter(type=User.Types.OWNER)

    def create(self, *args, **extra_fields):
        extra_fields.update({'type':User.Types.OWNER})
        return super().create(*args, **extra_fields)

class Owner(User):
    objects=OwnerManager()
    class Meta:
        proxy =True

class CustomerManager(models.Manager):
    def get_queryset(self, *args, **extra_fields):
        return super().get_queryset( *args, **extra_fields).filter(type=User.Types.CUSTOMER)
    
    def create(self, *args, **extra_fields):
        extra_fields.update({'type':User.Types.CUSTOMER})
        return super().create(*args, **extra_fields)

class Customer(User):
    objects=CustomerManager()
    class Meta:
        proxy =True
    
    
