import { useEffect, useState } from "react";
import NewPost from "../modules/NewPost";
import Post from "../components/Post";
import PostsListGroup from "../modules/PostsListGroup";

function AllPosts() {

    const [currentUser, setCurrentUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // checks if user is logged in to return post submission form
    useEffect(() => {
        fetch('/api/users/me/')
        // if not authenticated or failed request, return null
        .then(response => response.ok ? response.json() : null)
        .then(user => setCurrentUser(user))
    }, [])


    // updates all posts every submission
    useEffect(() => {
        fetch('/api/posts/')
        .then(response => response.json())
        .then(postsArray => setPosts(postsArray))
    }, [refreshTrigger])

    function updateCounter() {
        setRefreshTrigger(prev => prev + 1)
    }

    return (
        <div className=" d-flex flex-column gap-2">
            <h1>All posts</h1>
            { currentUser ? <NewPost onUpdate={ updateCounter }  /> : null }
            <PostsListGroup postsArray={ posts } />
        </div>
    )
}

export default AllPosts