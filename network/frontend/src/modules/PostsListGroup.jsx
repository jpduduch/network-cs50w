import Post from "../components/Post";
import { useEffect, useState } from "react";

function PostsListGroup ({refreshTrigger}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/all-posts/')
        .then(response => response.json())
        .then(content => setPosts(content))
    }, [refreshTrigger])

    return (
        <ul className="d-flex flex-column gap-2 p-0">
            {posts.map(post => (
                <Post content={post.content} creator={post.author} timestamp={post.date} likes={post.likes} />
            ))}
        </ul>
    )
}

export default PostsListGroup