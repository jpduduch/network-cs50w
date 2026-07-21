from django.urls import path
from . import views

urlpatterns = [
    # shell
    path("", views.shell, name="layout"),
    path("following/", views.shell, name="following"),
    path("user/<str:username>/", views.shell, name="profile"),
    # django served pages
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register, name="register"),
    # api calls
    path("api/posts/", views.posts, name="all_posts"),
    path("api/following/", views.following, name="following_posts"),
    path("api/send-post/", views.send_post, name="send_post"),
    path("api/users/me/", views.me, name="me"),
    path("api/users/<str:username>/", views.profile_info, name="profile_info"),
    path(
        "api/users/<int:user_id>/toggle-follow",
        views.toggle_follow,
        name="toggle_follow",
    ),
    path("api/posts/<int:post_id>/toggle-like/", views.toggle_like, name="toggle_like"),
]
