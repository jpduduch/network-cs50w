from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError


class User(AbstractUser):
    # o parâmetro symmetrical significa que A -> B mas B !<- A
    following = models.ManyToManyField('self', related_name='followers', blank=True, symmetrical=False)

    def clean(self):
        if self.following == self:
            raise ValidationError("User cannot follow self.")


class Post(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
