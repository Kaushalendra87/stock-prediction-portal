from django.contrib.auth.models import User
from django.test import TestCase

from .serializers import UserSerializers


class UserSerializersTestCase(TestCase):
    def test_serializer_accepts_frontend_registration_payload(self):
        payload = {
            'userName': 'alice',
            'email': 'alice@example.com',
            'password': 'strongpassword123',
            'confirmPassword': 'strongpassword123',
        }

        serializer = UserSerializers(data=payload)

        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()

        self.assertEqual(user.username, 'alice')
        self.assertEqual(user.email, 'alice@example.com')
        self.assertTrue(user.check_password('strongpassword123'))

    def test_serializer_rejects_mismatched_passwords(self):
        payload = {
            'userName': 'bob',
            'email': 'bob@example.com',
            'password': 'strongpassword123',
            'confirmPassword': 'differentpassword',
        }

        serializer = UserSerializers(data=payload)

        self.assertFalse(serializer.is_valid())
        self.assertIn('confirmPassword', serializer.errors)
