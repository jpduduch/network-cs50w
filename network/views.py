import json
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.http import require_POST


from .models import User, Post

def layout(request, username = None):
    
    # place CSRF token into request variable sent to client
    get_token(request)
    return render(request, "network/layout.html")


def following(request):
    # todo
    return JsonResponse({ 'data': 'Following (todo)' }, status=200)


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
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
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
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


# API calls
@login_required(login_url="/login/")
@require_POST
def send_post(request):
    
    data = json.loads(request.body)
    post = Post(content=data["content"], author=request.user)

    try:
        # Method .full_clean() validates all fields of a model instance and raises ValidationErrors if any issues are found.
        post.full_clean()
        post.save()

        #Validation errors are return messages that explain why a specific field has failed to be added to database.
    except ValidationError as e:
        return JsonResponse({"error": e.message_dict}, status=400)

    return JsonResponse({"message": "Post sent successfully."}, status=201)


@login_required(login_url="/login/")
@require_POST
def toggle_like(request, post_id):

    data = json.loads(request.body)
    post = Post.objects.get(pk=post_id)


def me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "id": request.user.id,
            "username": request.user.username,
        }, status=200)
    
    return JsonResponse({
        "error": "Not authenticated."
    }, status=401)


@login_required
def profile_info(request, username):

    profile = User.objects.get(username=username)
    posts = _get_posts_queryset(profile)

    return JsonResponse({
        'username': profile.username,
        'followers': profile.followers.count(),
        'following': profile.following.count(),
        'posts': [post.serialize(viewer=request.user) for post in posts]
    }, safe=False)


def posts(request):

    user = request.user if request.user.is_authenticated else None
    posts = _get_posts_queryset()
    return JsonResponse([post.serialize(viewer=user) for post in posts], safe=False)


# utils
def _get_posts_queryset(author=None):
    qs = Post.objects.all() if author is None else Post.objects.filter(author=author)
    return qs.order_by('-date')