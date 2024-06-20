from django.urls import path
from adminPannel.views import *

urlpatterns = [
    # path('generate-question/', index, name='ques_proc'),
    path('getQuestion/', getQuestion.as_view(), name='getQuestion'),
    path('deleteQuestion/', deleteQuestion.as_view(), name='deleteQuestion'),
    
    # path('questiondeletion/', QuestionDeletionView.as_view(), name='QuestionDeletionView'),
    
]

