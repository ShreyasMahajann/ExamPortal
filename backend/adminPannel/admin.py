from django.contrib import admin
from .models import *
# Register your models here.
class QuestionAdmin(admin.ModelAdmin):
    list_display=['id','field']


admin.site.register(Topic)
admin.site.register(Question,QuestionAdmin)