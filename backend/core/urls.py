from django.urls import path

from core.views import (
    ProjectListCreateAPIView,
    TaskListCreateAPIView,
    ProjectRetrieveUpdateDestroyAPIView,
    TaskRetrieveUpdateDestroyAPIView,
)


urlpatterns = [
    path("projects/", ProjectListCreateAPIView.as_view()),
    path("projects/<int:pk>/", ProjectRetrieveUpdateDestroyAPIView.as_view()),

    path("projects/<int:project_id>/tasks/", TaskListCreateAPIView.as_view()),
    path("projects/<int:project_id>/tasks/<int:pk>/", TaskRetrieveUpdateDestroyAPIView.as_view()),
]
