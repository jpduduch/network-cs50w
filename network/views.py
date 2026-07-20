import json
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.views.decorators.http import require_http_methods, require_POST


from .models import User, Post


def layout(request, username=None):

    # place CSRF token into request variable sent to client
    get_token(request)
    return render(request, "network/layout.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("layout"))
        else:
            return render(
                request,
                "network/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("layout"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request, "network/register.html", {"message": "Passwords must match."}
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(
                request, "network/register.html", {"message": "Username already taken."}
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


# API calls
# POST and delete
@login_required(login_url="/login/")
@require_POST
def send_post(request):

    data = json.loads(request.body)
    post = Post(content=data["content"], author=request.user)

    try:
        # Method .full_clean() validates all fields of a model instance and raises ValidationErrors if any issues are found.
        post.full_clean()
        post.save()

        # Validation errors are return messages that explain why a specific field has failed to be added to database.
    except ValidationError as e:
        return JsonResponse({"error": e.message_dict}, status=400)

    return JsonResponse({"message": "Post sent successfully."}, status=201)


@login_required(login_url="/login/")
@require_http_methods(["POST", "DELETE"])
def toggle_like(request, post_id):

    post = get_object_or_404(Post, pk=post_id)
    user = request.user
    post.likes.add(user) if request.method == "POST" else post.likes.remove(user)

    return JsonResponse({"response": "ok"}, status=201)


@login_required(login_url="/login/")
@require_http_methods(["POST", "DELETE"])
def toggle_follow(request, user_id):

    user_to_be_followed = get_object_or_404(User, pk=user_id)
    follower = request.user

    if not user_to_be_followed == follower:
        (
            user_to_be_followed.followers.add(follower)
            if request.method == "POST"
            else user_to_be_followed.followers.remove(follower)
        )

        return JsonResponse({"response": "ok"}, status=201)

    return JsonResponse({"error": "You cannot follow yourself."}, status=400)


# GET
@require_http_methods(["GET"])
@login_required(login_url="/login/")
def following(request):

    following_list = request.user.following.all()
    posts_from_following = Post.objects.filter(author__in=following_list).order_by(
        "-date"
    )

    return JsonResponse(
        [post.serialize(viewer=request.user) for post in posts_from_following],
        safe=False,
    )


def me(request):
    if request.user.is_authenticated:
        return JsonResponse(
            {
                "id": request.user.id,
                "username": request.user.username,
            },
            status=200,
        )

    return JsonResponse({"error": "Not authenticated."}, status=401)


def posts(request):

    requested_page = request.GET.get("page")
    user = request.user if request.user.is_authenticated else None
    pages = _get_all_pages()
    page = pages.get_page(requested_page)

    return JsonResponse(
        {
            "page": {
                "has_next": page.has_next(),
                "has_prev": page.has_previous(),
                "range": pages.num_pages,
                "current": page.number,
            },
            "posts": [post.serialize(viewer=user) for post in page],
        },
        safe=False,
    )


def profile_info(request, username):

    profile = get_object_or_404(User, username=username)
    pages = _get_all_pages(profile)

    return JsonResponse(
        {
            "id": profile.id,
            "username": profile.username,
            "followers": profile.followers.count(),
            "following": profile.following.count(),
            "is_following": profile.is_following(request.user),
            "posts": [post.serialize(viewer=request.user) for post in pages],
        },
        safe=False,
    )


# utils
def _get_all_pages(source=None):
    posts = Post.objects.all() if source is None else Post.objects.filter(viewer=source)
    pages = Paginator(posts.order_by("-date"), 10)
    return pages
