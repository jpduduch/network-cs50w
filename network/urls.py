
from django.urls import path
from . import views

urlpatterns = [
    # shell
    path("", views.layout, name="layout"),
    path("following/", views.layout, name="following"),
    path("profile/", views.layout, name="profile"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register, name="register"),

    # api calls
    path("api/posts/", views.posts, name="all_posts"),
    path("api/posts/user/<int:user_id>/", views.posts, name="posts"),
    path("api/following/", views.following, name="following_posts"),
    path("api/send-post/", views.send_post, name="send_post"),
    path("api/users/me/", views.me, name="me"),
    path("api/users/<str:username>/", views.user_info, name="user_info"),
]
