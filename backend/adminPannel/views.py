

from django.shortcuts import render,redirect
from .models import *
from rest_framework import generics ,status
from .serializer import ProctorSerializer 
from rest_framework.response import Response

# Create your views here.
class ReactView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = ProctorSerializer
    def get(self, request): #simply gets all the question in database or question of certain field if provided in get request
        queryset = super().get_queryset()
        field = self.request.query_params.get('field')
        if field:
            queryset = queryset.filter(field__topic=field)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):   # if a whole question is provided the creates that question as an object
        serializer = ProctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        delete_id = request.POST.get("delete_id") # if delete_id is provided then deletes that question from database in a post request as form data
        if not delete_id:
            return Response({"error": "delete_id not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = Question.objects.filter(id=delete_id)
        if queryset.exists():
            queryset.delete()
            return Response({"message": "Question deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        
        