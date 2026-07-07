import Post from "../components/Post";
import { useEffect, useState } from "react";

function PostsListGroup ({ postsArray }) {

    return (
        <ul className="d-flex flex-column gap-2 p-0">
            {postsArray?.map(post => (
                <Post content={post.content} creator={post.author} timestamp={post.date} likes={post.likes} />
            ))}
        </ul>
    )
}

export default PostsListGroup