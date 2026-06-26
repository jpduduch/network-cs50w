
from django.urls import path
from . import views

urlpatterns = [
    # shell
    path("", views.layout, name="layout"),
    path("following", views.layout, name="following"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # api calls
    path("api/all-posts", views.posts, name="all_posts"),
    path("api/following", views.following, name="following_posts"),
    path("api/send-post", views.send_post, name="send_post"),
    path("api/me", views.me, name="me")
]
