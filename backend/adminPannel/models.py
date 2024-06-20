
from django.db import models

# Create your models here.
class Topic(models.Model):
    topic=models.CharField(max_length=100)
    def __str__(self):
        return self.topic
    
class Question(models.Model):
    field=models.ForeignKey(Topic,on_delete=models.CASCADE)
    question=models.CharField(max_length=1000)
    option1=models.CharField(max_length=1000)
    option2=models.CharField(max_length=1000)
    option3=models.CharField(max_length=1000)
    option4=models.CharField(max_length=1000,default="none of these")
    answer=models.CharField(max_length=1000)
    
    def __str__(self):
        return self.field.topic