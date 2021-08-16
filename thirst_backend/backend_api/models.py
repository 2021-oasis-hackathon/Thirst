# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from rest_framework.exceptions import ValidationError

def satisfaction_val(val):
    if val:
        if 0<val and val<5:
            return val
        else:
            return ValidationError('worng val')
    return ValidationError('worng val')

class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'

class Tour(models.Model):
    tour_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(
        'user.Owner', 
        related_name="Own_tour", 
        on_delete=models.CASCADE,
        to_field="username", 
        )
    tour_name = models.CharField(max_length=50,unique=True)
    tour_desc = models.CharField(max_length=300, blank=True, null=True)
    tour_img = models.ImageField(default='media/default_tour.jpg')
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
    Aver_Satisfaction = models.PositiveIntegerField(null=True, validators=[satisfaction_val])

class Reserv(models.Model):
    reserv_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        'user.Customer',
        related_name="Cus_reserv", 
        on_delete=models.CASCADE, 
        to_field="username", 
        )
    tour = models.ForeignKey(
        Tour, 
        related_name="Tour_reserv", 
        on_delete=models.CASCADE,
        to_field="tour_name", 
        db_column="tour_id"
        )
    
    reserv_time = models.DateTimeField()
    person_num = models.PositiveIntegerField()
    


class Review(models.Model):
    review_num = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        'user.Customer', 
        related_name="Cus_review", 
        on_delete=models.CASCADE,
        to_field="username",  
        )
    tour = models.ForeignKey(
        Tour,
        related_name="tour_review", 
        on_delete=models.CASCADE, 
        )
    review_title = models.CharField(max_length=50,null=False)
    comment = models.CharField(max_length=300, blank=True, null=True)
    time = models.DateTimeField()
    review_img = models.CharField(max_length=100, blank=True, null=True)
    Satisfaction = models.PositiveIntegerField()




