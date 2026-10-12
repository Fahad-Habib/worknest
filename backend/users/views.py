from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from users.authentication import delete_auth_cookies, set_auth_cookies
from users.serializers import UserSerializer


User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        ser = self.get_serializer(data=request.data)
        ser.is_valid(raise_exception=True)

        access_token = ser.validated_data["access"]
        refresh_token = ser.validated_data["refresh"]

        response = Response({"detail": "Login successful."})
        set_auth_cookies(response, access_token, refresh_token)
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.AUTH_COOKIE_REFRESH_TOKEN_KEY)
        if not refresh_token:
            return Response({"detail": "Refresh token not found."}, status=401)

        request.data["refresh"] = refresh_token
        try:
            response = super().post(request, *args, **kwargs)
        except User.DoesNotExist:
            response = Response({"detail": "User not found."}, status=401)
            delete_auth_cookies(response)
            return response
        if response.status_code == 200:
            access_token = response.data["access"]
            new_refresh_token = response.data.get("refresh", refresh_token)
            set_auth_cookies(response, access_token, new_refresh_token)
            response.data = {"detail": "Tokens refreshed."}
        return response


class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response({"detail": "Logout successful."})
        delete_auth_cookies(response)
        return response


class MeAPIView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
