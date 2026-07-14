import Post from "../components/Post";
import { useEffect, useState } from "react";

function PostsListGroup ({ postsArray, user }) {
    return (
        <ul className="d-flex flex-column gap-2 p-0">
            {postsArray?.map(contents => (
                <Post key={contents.id} metadata = { contents } user = { user } />
            ))}
        </ul>
    )
}

export default PostsListGroup