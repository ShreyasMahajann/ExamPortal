from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

class User(models.Model):
    image = models.URLField()
    registration_id = models.CharField(unique=True, max_length=20)
    questions_attempted=models.JSONField(null=True, blank=True)
    score= models.IntegerField(default=0)
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
