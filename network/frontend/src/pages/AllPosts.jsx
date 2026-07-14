import { useEffect, useState } from "react";
import NewPost from "../modules/NewPost";
import Post from "../components/Post";
import PostsListGroup from "../modules/PostsListGroup";

function AllPosts({ user }) {

    const [posts, setPosts] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
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
            { user ? <NewPost onUpdate={ updateCounter }  /> : null }
            <PostsListGroup postsArray={ posts } user={ user } />
        </div>
    )
}

export default AllPosts