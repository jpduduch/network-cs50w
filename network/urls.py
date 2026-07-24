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
    path("api/posts/all/", views.posts, name="api_all_posts"),
    path("api/posts/users/<str:username>/", views.posts, name="api_all_posts"),
    path("api/posts/following/", views.following, name="api_following"),
    path("api/send-post/", views.send_post, name="api_send_post"),
    path("api/users/me/", views.me, name="me"),
    path("api/users/<str:username>/", views.profile, name="api_profile"),
    path(
        "api/users/<int:user_id>/toggle-follow",
        views.toggle_follow,
        name="toggle_follow",
    ),
    path("api/posts/<int:post_id>/toggle-like/", views.toggle_like, name="toggle_like"),
]
