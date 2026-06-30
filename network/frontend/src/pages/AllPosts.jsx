import { useEffect, useState } from "react";
import NewPost from "../modules/NewPost";
import Post from "../components/Post";
import PostsListGroup from "../modules/PostsListGroup";

function AllPosts({ user }) {

    const [newPostCounter, setNewPostCounter] = useState(0);

    function updatePostsList() {
        setNewPostCounter(prev => prev + 1);
    }

    return (
        <div className=" d-flex flex-column gap-2">
            <h1>All posts</h1>
            { user ? <NewPost onUpdate={updatePostsList} /> : null }
            <PostsListGroup refreshTrigger={newPostCounter} />
        </div>
    )
}

export default AllPosts