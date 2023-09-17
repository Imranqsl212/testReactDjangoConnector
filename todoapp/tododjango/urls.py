from django.urls import path
from . import views

urlpatterns = [
  path('todos/',views.todolist,name='todos'),
  path('todos/<int:pk>/',views.todoDetails,name='todo')
]
