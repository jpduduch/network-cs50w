import { useEffect, useState } from "react";
import Button from "../components/Button";
import PostsListGroup from "../modules/PostsListGroup";

function Profile({ username }) {

    // fetch requested profile info
    // fetch posts from requested profile

    return(
        <main className="d-flex gap-4 flex-column">
            <h3>{user.username}</h3>
            <div className="d-flex gap-4">
                <span><span className="fw-bold">{user.followers}</span> <span className="text-body-secondary">followers</span></span> 
                <span><span className="fw-bold">{user.following}</span> <span className="text-body-secondary">following</span></span>
            </div>
            <Button hierarchy="secondary" label="Follow" />
            <hr />
            <h6>Posts</h6>
            <PostsListGroup postsArray={ user } /> 
        </main>
    )
}

export default Profile