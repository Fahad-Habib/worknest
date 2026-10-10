from django.urls import path

from core.views import ProjectListAPIView, TaskListCreateAPIView, ProjectDetailAPIView, TaskRetrieveUpdateDestroyAPIView


urlpatterns = [
    path("projects/", ProjectListAPIView.as_view()),
    path("projects/<int:pk>/", ProjectDetailAPIView.as_view()),

    path("projects/<int:project_id>/tasks/", TaskListCreateAPIView.as_view()),
    path("projects/<int:project_id>/tasks/<int:pk>/", TaskRetrieveUpdateDestroyAPIView.as_view()),
]
