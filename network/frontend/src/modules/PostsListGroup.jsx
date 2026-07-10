import Post from "../components/Post";
import { useEffect, useState } from "react";

function PostsListGroup ({ postsArray }) {
    console.log(postsArray)
    return (
        <ul className="d-flex flex-column gap-2 p-0">
            {postsArray?.map(post => (
                <Post 
                    postID={post.id}
                    content={post.content}
                    creator={post.author}
                    timestamp={post.date}
                    likes={post.likes}
                    hasLike={post.has_like}
                />
            ))}
        </ul>
    )
}

export default PostsListGroup