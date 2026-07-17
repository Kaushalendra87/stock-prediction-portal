from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializers(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8,style={'input_type':'password'})
    class Meta:
        model = User
        fields = ['username','email','password']

    def create(self, validated_data):
        #Using User.objects.create = Saves password as a plain text
        #Using User.objects.create_user = Hash the password and then saves it

        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        #user=User.objects.create_user(**validated_data)

        return user