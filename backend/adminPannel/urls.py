from django.urls import path
from adminPannel.views import *

urlpatterns = [
    # path('generate-question/', index, name='ques_proc'),
    path('questions/', ReactView.as_view(), name='ReactView'),
    # path('questiondeletion/', QuestionDeletionView.as_view(), name='QuestionDeletionView'),
    
]

