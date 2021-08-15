# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.utils.translation import gettext_lazy as _

class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Owner(models.Model):
    owner_id = models.CharField(primary_key=True, max_length=30)
    pw = models.CharField(max_length=10)
    name = models.CharField(max_length=10)
    phone = models.PositiveIntegerField()
    credit = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'owner'


class Reserv(models.Model):
    reserv_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    tour = models.ForeignKey('Tour', models.DO_NOTHING)
    reserv_time = models.DateTimeField()
    person_num = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'reserv'


class Review(models.Model):
    review_num = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    tour = models.ForeignKey('Tour', models.DO_NOTHING)
    comment = models.CharField(max_length=300, blank=True, null=True)
    time = models.DateTimeField()
    review_img = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'


class Tour(models.Model):
    tour_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(Owner, models.DO_NOTHING)
    tour_name = models.CharField(max_length=50)
    tour_desc = models.CharField(max_length=300, blank=True, null=True)
    tour_img = models.CharField(max_length=100, blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    tour_addr = models.CharField(max_length=100)
    tour_phone_num = models.CharField(max_length=100, blank=True, null=True)
    tour_time_at_one = models.PositiveIntegerField()
    tour_person_limit = models.PositiveIntegerField(blank=True, null=True)
    tour_min_person_at_one = models.PositiveIntegerField()
    tour_max_person_at_one = models.PositiveIntegerField()
    tour_price = models.PositiveIntegerField()
    tour_theme = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tour'


# class User(models.Model):
#     user_id = models.CharField(primary_key=True, max_length=30)
#     pw = models.CharField(max_length=10)
#     name = models.CharField(max_length=10)
#     phone = models.PositiveIntegerField()
#     credit = models.PositiveIntegerField()

#     class Meta:
#         managed = False
#         db_table = 'user'


#####

class UserManager(BaseUserManager):
    def create_user(self, email, name, phone, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            phone=phone
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, phone, password):
        user = self.create_user(
            email=self.normalize_email(email),
            name= name,
            phone= phone,
            password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user



class User(AbstractBaseUser):
    class Types(models.TextChoices):
        OWNER='OWNER','Owner'
        CUSTOMER='CUSTOMER','Customer'
    type =models.CharField(
        _('Type'),max_length=50,choices=Types.choices,default=Types.CUSTOMER
    )

    # types = models.CharField(max_length=100)
    name = models.CharField(max_length=100,unique=True)
    phone = models.PositiveIntegerField()
    credit = models.PositiveIntegerField()

    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # date_joined = models.DateTimeField(auto_now_add=True)

    objects=UserManager()

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS=['type','phone']
