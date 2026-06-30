import { useEffect, useState } from "react";
import NewPost from "../modules/NewPost";
import Post from "../components/Post";

function AllPosts({ user }) {
    // Temporary setup.
    // const [data, setData] = useState("Loading…");

    // useEffect(() => {
    //     fetch('api/all-posts')
    //     .then(response => response.json())
    //     .then(data => setData(data.data))
    // }, [])

    return (
        <div className=" d-flex flex-column gap-2">
            <h1>All posts</h1>
            { user ? <NewPost /> : null }
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default AllPosts