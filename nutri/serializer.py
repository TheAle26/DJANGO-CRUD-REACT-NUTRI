from rest_framework import serializers
from .models import Task, User, Nutritionist, Patient, Measurement

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        #fields = ('id', 'title', 'description', 'done') asi para elejir
        fields = '__all__' #se pasan todos los campos del modelo Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class NutritionistSerializer(serializers.ModelSerializer):
    # Traemos los datos prestados del modelo User vinculado
    name = serializers.CharField(source='user.first_name', read_only=True)
    surname = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Nutritionist
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'
