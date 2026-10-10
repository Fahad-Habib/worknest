from rest_framework.generics import RetrieveAPIView

from users.serializers import UserSerializer


class MeAPIView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
