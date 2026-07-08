from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # o parâmetro symmetrical false significa que A -> B mas B !<- A
    following = models.ManyToManyField('self', related_name='followers', blank=True, symmetrical=False)


class Post(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def serialize(self, viewer=None):
        return {
            "id": self.id,
            "content": self.content,
            "author": self.author.username,
            "date": self.date.strftime("%b %d %Y, %I:%M %p"),
            "likes": self.likes.count(),
            "has_like": self.likes.filter(pk=viewer.pk).exists() if viewer else False
        }
