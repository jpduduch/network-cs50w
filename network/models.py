from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # o parâmetro symmetrical false significa que, ao adicionar entrada em A, não adiciona a relação oposta 
    following = models.ManyToManyField('self', related_name='followers', blank=True, symmetrical=False)

    def is_following(self, viewer):
        return self.followers.filter(pk=viewer.pk).exists() if viewer else False


class Post(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def has_like(self, viewer):
        return self.likes.filter(pk=viewer.pk).exists() if viewer else False

    def serialize(self, viewer=None):
        return {
            "id": self.id,
            "content": self.content,
            "author": self.author.username,
            "date": self.date.strftime("%b %d %Y, %I:%M %p"),
            "likes": self.likes.count(),
            "has_like": self.has_like(viewer)
        }
