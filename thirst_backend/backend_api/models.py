# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

from django.core.validators import RegexValidator
from thirst_backend.func import (
    satisfaction_val,
    tour_image_path,
    review_image_path,
)

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
    tour_img = models.ImageField(default='media/api_tour/default_tour.jpg',upload_to=tour_image_path)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    tour_addr = models.CharField(max_length=100)
    #phone_num 확인할것
    tour_phone_num = models.CharField(max_length=13,validators=[RegexValidator(r'^\d{0-9}$')],default='00000000000')
    tour_time_at_one = models.PositiveIntegerField()
    tour_person_limit = models.PositiveIntegerField(default=999,null=False)
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
    class time_detail(models.IntegerChoices):
        time_1=1
        time_2=2
        time_3=3
        time_4=4
        time_5=5
    reserv_time_detail=models.IntegerField(choices=time_detail.choices,null=True)
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
        to_field="tour_name",
        )
    review_title = models.CharField(max_length=50,null=False)
    comment = models.CharField(max_length=300, blank=True, null=True)
    time = models.DateTimeField(auto_now_add=True)
    review_img = models.ImageField(default='media/api_review/default_review.jpg',upload_to=review_image_path)
    Satisfaction = models.PositiveIntegerField()

class ReservOneday(models.Model):
    oneday_table_id = models.AutoField(primary_key=True)
    tour_name = models.ForeignKey(
        Tour,
        related_name="tour_reserv_info", 
        on_delete=models.CASCADE, 
        to_field="tour_name", 
        )
    reserv_time=models.DateTimeField()
    tour_limit_person=models.PositiveIntegerField(null=True)
    time_1=models.PositiveIntegerField(default=0)
    time_2=models.PositiveIntegerField(default=0)
    time_3=models.PositiveIntegerField(default=0)
    time_4=models.PositiveIntegerField(default=0)
    time_5=models.PositiveIntegerField(default=0)


