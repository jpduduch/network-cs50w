import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PostsListGroup from "../modules/PostsListGroup";
import FollowButton from "../components/custom/FollowButton";
import apiFetch from "../utils/apiFetch";
import Caption from "../components/Caption";

function Profile({user}) {

    const { username } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [followError, setFollowError] = useState(null);
    
    
    // fetch requested profile info
    useEffect(() => {
        fetch(`/api/users/${username}`)
        .then(response => response.json())
        .then(body => {
            setUserInfo(body);
        })
    }, [])

    // follow / unfollow behavior
    function toggleFollow() {

        const url = `/api/users/${userInfo.id}/set-follow`;
        const method = userInfo.is_following ? 'DELETE' : 'POST';
        
        apiFetch(url, method)
        .then(response => response.json())
        .then(body => {
            if ("error" in body) {
                setFollowError(body.error)
            } else {
                setUserInfo((prev) => ({
                    ...prev,
                    followers: prev.is_following ? prev.followers - 1 : prev.followers + 1,
                    is_following: !prev.is_following
                }))
            }
        })
    }


    return(
        <main className="d-flex gap-4 flex-column">
            <h3>{userInfo.username}</h3>
            <div className="d-flex gap-4">
                <span><span className="fw-bold">{userInfo.followers}</span> <span className="text-body-secondary">followers</span></span> 
                <span><span className="fw-bold">{userInfo.following}</span> <span className="text-body-secondary">following</span></span>
            </div>
            
            { user && user.username !== userInfo.username ? <FollowButton isFollowing={ userInfo.is_following } onClick={ toggleFollow } /> : null }
            { followError ? <Caption value={ followError } /> : null }
            
            <hr />
            
            <h6>Posts</h6>
            
            <PostsListGroup postsArray={ userInfo.posts } user={user} />

        </main>
    )
}

export default Profile