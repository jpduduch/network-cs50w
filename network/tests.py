import json
from django.db import IntegrityError
from django.test import TestCase, Client
from .models import User, Post
from datetime import datetime

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

    def test_model_returns_correct_fields(self):
        Post.objects.create(content="ABC", author=self.user_a)
        post = Post.objects.all().first()
        self.assertTrue(type(post.content), str)
        self.assertTrue(type(post.author.username), str)
        self.assertTrue(type(post.likes), int)
        self.assertTrue(type(post.date), datetime)


class ViewPostTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_a = User.objects.create_user(username="user_a", password="123")
        self.user_b = User.objects.create_user(username="user_b", password="123")

        Post.objects.create(content="ABC", author=self.user_a)
        Post.objects.create(content="DEF", author=self.user_b)

        self.send_post_addr = "/api/send-post/"

    def test_create_post_requires_login(self):
        response = self.client.post(
            self.send_post_addr,
            data=json.dumps({"content": "content"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 302)

    def test_authenticated_user_can_create_post(self):
        self.client.login(username="user_a", password="123")

        response = self.client.post(
            self.send_post_addr,
            data=json.dumps({"content": "Novo post"}),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Post.objects.count(), 3)

    def test_post_rejects_empty_content(self):
        self.client.login(username="user_a", password="123")

        response = self.client.post(
            self.send_post_addr,
            data=json.dumps({"content": ""}),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, 400)

    def test_api_returns_correct_amount_of_posts(self):
        self.client.login(username="user_a", password="123")
        
        posts_initial_amount = Post.objects.all().count()
        post_amount = 99
        
        for _ in range(post_amount):
            self.client.post(
                self.send_post_addr,
                data=json.dumps({"content": f"Content {_}"}),
                content_type="application/json"
            )

        self.assertEqual(post_amount, Post.objects.all().count() - posts_initial_amount)
        api_response = self.client.get('/api/posts/')
        self.assertEqual(len(api_response.json()), post_amount + posts_initial_amount)

    def test_api_returns_correct_field_types(self):
        first_post = self.client.get('/api/posts/').json()[0]
        self.assertIsInstance(first_post["content"], str)
        self.assertIsInstance(first_post["author"], str)
        self.assertIsInstance(first_post["likes"], int)

        # Ensure date is in readable format:
        datetime.strptime(first_post["date"], "%b %d %Y, %I:%M %p")
