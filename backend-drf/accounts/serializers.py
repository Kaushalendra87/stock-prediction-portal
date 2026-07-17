from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializers(serializers.ModelSerializer):
    userName = serializers.CharField(write_only=True, required=True, source='username')
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    confirmPassword = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['userName', 'email', 'password', 'confirmPassword']

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirmPassword')

        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError({'confirmPassword': 'Passwords do not match.'})

        return attrs

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )
        return user