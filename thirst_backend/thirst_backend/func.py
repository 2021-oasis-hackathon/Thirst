from rest_framework.exceptions import ValidationError
import os

def satisfaction_val(val):
    if val:
        if 0<val and val<5:
            return val
        else:
            return ValidationError('worng val')
    return ValidationError('worng val')

def tour_image_path(instance, filename):
    return 'api_tour/'+instance.tour_name + os.path.splitext(filename)[1]

def review_image_path(instance, filename):
    return 'api_review/'+instance.review_num + os.path.splitext(filename)[1]

def user_image_path(instance, filename):
    return 'user_profile/'+instance.username + os.path.splitext(filename)[1]