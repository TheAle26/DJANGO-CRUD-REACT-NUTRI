from django.http import request
from rest_framework.decorators import api_view, permission_classes
from . import models
from rest_framework import viewsets
from .serializer import TaskSerializer , NutritionistSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist


class LoginViewSet(viewsets.ModelViewSet):
    
    e=2

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetNutritionistProfile(request):
    try:
        # request.user contiene al usuario logueado gracias al token JWT
        nutricionista = request.user.nutritionist_profile
        serializer = NutritionistSerializer(nutricionista)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        # Por si el usuario no tiene un perfil de nutricionista asociado
        return Response({"error": "Este usuario no es un nutricionista."}, status=404)
    
    



class TaskViewSet(viewsets.ModelViewSet):
    # Especificamos qué serializador usará esta vista para traducir entre JSON y objetos Python.
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        """
        Sobreescribimos get_queryset para personalizar la consulta a la base de datos.
        Regla estricta de Django REST Framework: este método DEBE retornar un QuerySet.
        """
        # Obtenemos todas las tareas de la base de datos y las ordenamos por ID.
        tareas_filtradas = models.Task.objects.all().order_by('id')
        
        # Limitamos el resultado al primer elemento usando "slicing" ([:1]).
        # A nivel base de datos, esto ejecuta una consulta con "LIMIT 1".
        # Utilizamos [:1] en lugar de .first() porque el slicing preserva el tipo de dato
        # como un QuerySet (una "caja" con 1 elemento), evitando que la vista falle.
        #tareas_filtradas = tareas_filtradas[:1]
        
        return tareas_filtradas
