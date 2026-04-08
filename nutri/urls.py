from django.urls import path, include
from . import views
from rest_framework import routers
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

router = routers.DefaultRouter()
router.register(r'task', views.TaskViewSet, basename='task') #asi agrego las vistas
#las rutas es api(que esta en el urls.py del proyecto) + nutri(que esta en el urls.py de la app(aca abajo)) + task(que es la ruta que se le asigno a la vista)
#para agregar rutas es router.register(r'como sigue la ruta', views.loqueseaViewSet, basename='loquesea') 
router.register(r'taskSave', views.TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    
    path('mi-nutri-perfil/',views.GetNutritionistProfile),

    
    # Login (JWT): send email + password (matches nutri.User.USERNAME_FIELD).
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # This is used to get a new access token when the old one expires.
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
    
    # Para la documentación de la API, agregamos dos rutas:
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # La ruta para la interfaz de usuario de Swagger, que consume el esquema generado por la ruta anterior.
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
