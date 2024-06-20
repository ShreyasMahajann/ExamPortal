from rest_framework import serializers
from .models import Question, Topic

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ["topic"]

class ProctorSerializer(serializers.ModelSerializer):
    field = TopicSerializer()

    class Meta:
        model = Question
        fields = ["id", "question", "option1", "option2", "option3", "option4", "answer", "field"]
