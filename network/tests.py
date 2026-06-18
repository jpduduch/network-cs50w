from django.test import TestCase
from .models import User

# Create your tests here.

# B. Posts

# Se usuário consegue postar.
# Se usuário consegue editar somente os próprios posts.
# Se usuário consegue apagar somente os próprios posts.
# Se usuário consegue dar like em posts (deles próprios e de terceiros) somente se o post não tiver um like deste usuário
# Se usuário consegue remover o like se houver um like deste mesmo usuário.

class ModelFollowTests(TestCase):
    def setUp(self):
        self.user_a = User.objects.create_user(username='user_a', password='123')
        self.user_b = User.objects.create_user(username='user_b', password='123')

    def test_user_can_follow_another(self):
        self.user_a.following.add(self.user_b)
        user_follows = self.user_a.following.filter(pk=self.user_b.id).exists()
        self.assertTrue(user_follows)

    def test_user_does_not_follow_each_other_automatically(self):
        self.user_a.following.add(self.user_b)
        user_a_follows = self.user_a.following.filter(pk=self.user_b.id).exists()
        self.assertTrue(user_a_follows)

        user_b_follows_user_a = self.user_b.following.filter(pk=self.user_a.id).exists()
        self.assertFalse(user_b_follows_user_a)

    def test_user_can_unfollow(self):
        self.user_a.following.add(self.user_b)
        user_follows = self.user_a.following.filter(pk=self.user_b.id).exists()
        self.assertTrue(user_follows)

        self.user_a.following.remove(self.user_b)
        user_follows = self.user_a.following.filter(pk=self.user_b.id).exists()
        self.assertFalse(user_follows)
