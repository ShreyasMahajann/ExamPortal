from rest_framework import serializers
from .models import Question,Topic
class ProctorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields=['id','question','option1','option2','option3','option4','answer']
