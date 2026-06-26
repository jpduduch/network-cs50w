import { useEffect, useState } from "react";
import NewPost from "../modules/NewPost";

function AllPosts({ user }) {
    // Temporary setup.
    // const [data, setData] = useState("Loading…");

    // useEffect(() => {
    //     fetch('api/all-posts')
    //     .then(response => response.json())
    //     .then(data => setData(data.data))
    // }, [])

    console.log(user)

    return (
        <div className=" d-flex flex-column gap-3">
            <h1>All posts</h1>
            { user ? <NewPost /> : null }
        </div>
    )
}

export default AllPosts