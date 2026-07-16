import json
from django.db import IntegrityError
from django.test import TestCase, Client
from django.urls import reverse
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


class LikeViewAuthenticationTests(TestCase):
    def setUp(self):
        self.author = User.objects.create_user(username="autor", password="senha123")
        self.post = Post.objects.create(author=self.author, content="Post de teste")
        self.like_url = f"/api/posts/{self.post.id}/set-like/"

    def test_anonymous_user_cannot_like_post(self):
        response = self.client.post(self.like_url)

        # @login_required redireciona quem não está autenticado (302),
        # não chega a executar a lógica da view
        self.assertEqual(response.status_code, 302)

        # Garantia real: a curtida não pode ter sido registrada no banco
        self.assertEqual(self.post.likes.count(), 0)

    def test_anonymous_user_cannot_unlike_post(self):
        # Post já curtido por outro usuário, para garantir que nada é desfeito
        other_user = User.objects.create_user(username="outro", password="senha123")
        self.post.likes.add(other_user)

        response = self.client.delete(self.like_url)

        self.assertEqual(response.status_code, 302)

        # A curtida existente precisa permanecer intacta
        self.assertIn(other_user, self.post.likes.all())
        self.assertEqual(self.post.likes.count(), 1)

    def test_authenticated_user_can_like_post(self):
        # Teste de sanidade: garante que o par de testes acima não está
        # passando "por acidente" (ex: endpoint quebrado pra todo mundo)
        self.client.login(username="autor", password="senha123")

        response = self.client.post(self.like_url)

        self.assertEqual(response.status_code, 201)
        self.assertIn(self.author, self.post.likes.all())
        

class ToggleFollowViewTests(TestCase):

    def setUp(self):
        self.user_a = User.objects.create_user(username="alice", password="senha123")
        self.user_b = User.objects.create_user(username="bruno", password="senha123")
        self.user_c = User.objects.create_user(username="carla", password="senha123")
 
    # ---------- Autenticação ----------
 
    def test_follow_requires_authentication(self):
        response = self.client.post(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        self.assertEqual(response.status_code, 302)
        self.assertFalse(self.user_a.following.filter(pk=self.user_b.pk).exists())
 
    def test_unfollow_requires_authentication(self):
        self.user_a.following.add(self.user_b)
        response = self.client.delete(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        self.assertEqual(response.status_code, 302)
        # estado não deve ter mudado
        self.assertTrue(self.user_a.following.filter(pk=self.user_b.pk).exists())
 
    # ---------- Idempotência ----------
 
    def test_follow_creates_relationship(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.post(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(self.user_a.following.filter(pk=self.user_b.pk).exists())
 
    def test_follow_twice_is_noop(self):
        self.client.login(username="alice", password="senha123")
        self.client.post(reverse("toggle_follow", kwargs={"user_id": self.user_b.id}))
        response = self.client.post(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(self.user_a.following.filter(pk=self.user_b.pk).count(), 1)
 
    def test_unfollow_removes_relationship(self):
        self.user_a.following.add(self.user_b)
        self.client.login(username="alice", password="senha123")
        response = self.client.delete(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        self.assertEqual(response.status_code, 201)
        self.assertFalse(self.user_a.following.filter(pk=self.user_b.pk).exists())
 
    def test_unfollow_before_following_is_noop(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.delete(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        self.assertEqual(response.status_code, 201)
        self.assertFalse(self.user_a.following.filter(pk=self.user_b.pk).exists())
 
    # ---------- Regra: não pode seguir a si mesmo ----------
 
    def test_cannot_follow_self(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.post(
            reverse("toggle_follow", kwargs={"user_id": self.user_a.id})
        )
        data = json.loads(response.content)
        self.assertIn("error", data)
        self.assertFalse(self.user_a.following.filter(pk=self.user_a.pk).exists())
 
    def test_cannot_unfollow_self(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.delete(
            reverse("toggle_follow", kwargs={"user_id": self.user_a.id})
        )
        data = json.loads(response.content)
        self.assertIn("error", data)
 
    # ---------- Alvo inexistente ----------
 
    def test_follow_nonexistent_user_returns_404(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.post(
            reverse("toggle_follow", kwargs={"user_id": 999999})
        )
        self.assertEqual(response.status_code, 404)
 
    def test_unfollow_nonexistent_user_returns_404(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.delete(
            reverse("toggle_follow", kwargs={"user_id": 999999})
        )
        self.assertEqual(response.status_code, 404)
 
    # ---------- Método HTTP errado ----------
 
    def test_get_method_not_allowed(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.get(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        self.assertEqual(response.status_code, 405)
 
    # ---------- Contrato da resposta de sucesso ----------
 
    def test_follow_success_response_body(self):
        self.client.login(username="alice", password="senha123")
        response = self.client.post(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        data = json.loads(response.content)
        self.assertEqual(data, {"response": "ok"})
 
    def test_unfollow_success_response_body(self):
        self.user_a.following.add(self.user_b)
        self.client.login(username="alice", password="senha123")
        response = self.client.delete(
            reverse("toggle_follow", kwargs={"user_id": self.user_b.id})
        )
        data = json.loads(response.content)
        self.assertEqual(data, {"response": "ok"})
 
    # ---------- Isolamento entre relações ----------
 
    def test_following_one_user_does_not_affect_another(self):
        self.client.login(username="alice", password="senha123")
        self.client.post(reverse("toggle_follow", kwargs={"user_id": self.user_b.id}))
        self.client.post(reverse("toggle_follow", kwargs={"user_id": self.user_c.id}))
        self.assertTrue(self.user_a.following.filter(pk=self.user_b.pk).exists())
        self.assertTrue(self.user_a.following.filter(pk=self.user_c.pk).exists())
 
    def test_unfollowing_one_user_does_not_affect_others_followers(self):
        self.user_a.following.add(self.user_b)
        self.user_c.following.add(self.user_b)
        self.client.login(username="alice", password="senha123")
        self.client.delete(reverse("toggle_follow", kwargs={"user_id": self.user_b.id}))
        self.assertFalse(self.user_a.following.filter(pk=self.user_b.pk).exists())
        self.assertTrue(self.user_c.following.filter(pk=self.user_b.pk).exists())
