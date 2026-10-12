from django.urls import path

from users.views import MeAPIView, CustomTokenRefreshView, CustomTokenObtainPairView, LogoutAPIView

urlpatterns = [
    path("me/", MeAPIView.as_view(), name="me"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh")
]
