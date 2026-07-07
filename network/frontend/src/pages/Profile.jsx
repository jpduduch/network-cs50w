import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PostsListGroup from "../modules/PostsListGroup";

function Profile() {

    const { username } = useParams();
    const [userInfo, setUserInfo] = useState({});

    // fetch requested profile info
    useEffect(() => {
        fetch(`/api/users/${username}`)
        .then(response => response.json())
        .then(body => {
            setUserInfo(body);
        })
    }, [])

    return(
        <main className="d-flex gap-4 flex-column">
            <h3>{userInfo.username}</h3>
            <div className="d-flex gap-4">
                <span><span className="fw-bold">{userInfo.followers}</span> <span className="text-body-secondary">followers</span></span> 
                <span><span className="fw-bold">{userInfo.following}</span> <span className="text-body-secondary">following</span></span>
            </div>
            <Button hierarchy="secondary" label="Follow" />
            <hr />
            <h6>Posts</h6>
            
            <PostsListGroup postsArray={ userInfo.posts } />

        </main>
    )
}

export default Profile