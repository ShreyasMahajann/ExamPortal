from rest_framework import serializers
from .models import Question, Topic

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ["id","topic"]

class ProctorSerializer(serializers.ModelSerializer):
    field = TopicSerializer()

    class Meta:
        model = Question
        fields = ["id", "question", "option1", "option2", "option3", "option4", "answer", "field"]

    def create(self, validated_data):
        field_data = validated_data.pop('field')
        field = Topic.objects.get(**field_data)
        question = Question.objects.create(field=field, **validated_data)
        return question
    
    
    def validate(self, attrs):
        field_data = attrs.get('field')
        if not field_data:
            raise serializers.ValidationError("Field data is required")
        try:
           topic=Topic.objects.get(**field_data)
        except Topic.DoesNotExist:
            raise serializers.ValidationError("Field does not exist")
        return attrs
    
    def update(self, instance, validated_data):
        # field_data = validated_data.pop('field')
        instance.question = validated_data.get('question', instance.question)
        instance.option1 = validated_data.get('option1', instance.option1)
        instance.option2 = validated_data.get('option2', instance.option2)
        instance.option3 = validated_data.get('option3', instance.option3)
        instance.option4 = validated_data.get('option4', instance.option4)
        instance.answer = validated_data.get('answer', instance.answer)
        instance.save()
        return instance