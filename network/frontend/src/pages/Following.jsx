import { useEffect, useState } from "react";
import PostsListGroup from "../modules/PostsListGroup";

function Following({user}) {
    
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/following/')
        .then(response => response.json())
        .then(body => {
            setPosts(body);
            setIsLoading(false);
        })
    }, [])

    if (!user) {
        window.location.href = "/login/"
    }

    return(
        <div>
            { isLoading ? "Loading posts…" : null }
            { posts.length === 0 && isLoading === false ? "You are not following anyone." :  <PostsListGroup postsArray={posts} user={user} /> }
        </div>
    )
}

export default Following