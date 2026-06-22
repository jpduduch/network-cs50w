from django.db import IntegrityError
from django.test import TestCase
from .models import User, Post

# Create your tests here.

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


class ModelPostTests(TestCase):
    def setUp(self):
        self.user_a = User.objects.create_user(username='user_a', password='123')
        self.user_b = User.objects.create_user(username='user_b', password='123')
        self.user_c = User.objects.create_user(username='user_c', password='123')

    def test_anonymous_user_cannot_post(self):
        with self.assertRaises(IntegrityError):
            Post.objects.create(content='Anonymous post')

    def test_authenticated_user_can_post(self):
        Post.objects.create(content='Some post', author=self.user_a)
        post_exists = Post.objects.filter(author=self.user_a)
        self.assertTrue(post_exists)

    def test_user_can_like_and_dislike_own_post(self):
        post = Post.objects.create(content='Some post', author=self.user_a)
        self.user_a.liked_posts.add(post)
        like_exists = Post.objects.filter(likes=self.user_a).exists()
        self.assertTrue(like_exists)

        self.user_a.liked_posts.remove(post)
        like_exists = Post.objects.filter(likes=self.user_a).exists()
        self.assertFalse(like_exists)
    
    def test_user_can_like_and_dislike_other_post(self):
        post = Post.objects.create(content='Some post', author=self.user_a)
        self.user_b.liked_posts.add(post)
        like_exists = Post.objects.filter(likes=self.user_b).exists()
        self.assertTrue(like_exists)

        self.user_b.liked_posts.remove(post)
        like_exists = Post.objects.filter(likes=self.user_b).exists()
        self.assertFalse(like_exists)

    def test_user_sees_only_posts_from_users_they_follow(self):
        post_a = Post.objects.create(content='This is post A.', author=self.user_a)
        post_b = Post.objects.create(content='This is Post B', author=self.user_b)
        self.user_c.following.add(self.user_b)

        posts_from_following = Post.objects.filter(author__followers=self.user_c)
        self.assertTrue(posts_from_following.exists())
        self.assertFalse(posts_from_following.contains(post_a))