

from django.shortcuts import render,redirect
from .models import *
from rest_framework import generics ,status
from .serializer import ProctorSerializer 
from rest_framework.response import Response





#admin
#admin@123

# Create your views here.
class getQuestion(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = ProctorSerializer
    def get(self, request): #simply gets all the question in database or question of certain field if provided in get request
        queryset = super().get_queryset()
        field = self.request.query_params.get('field')
        if field:
            queryset = queryset.filter(field__topic=field)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self, request):   # if a whole question is provided the creates that question as an object
        serializer = ProctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
    def patch(self, request, *args, **kwargs):
        question_id = request.data.get('id')
        if not question_id:
            return Response({"error": "id not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProctorSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class deleteQuestion(generics.DestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = ProctorSerializer

    def delete(self, request, *args, **kwargs):
        delete_id = request.data.get("delete_id")
        if not delete_id:
            return Response({"error": "delete_id not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = Question.objects.filter(id=delete_id)
        if queryset.exists():
            queryset.delete()
            return Response({"message": "Question deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
