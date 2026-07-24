import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import PostsListGroup from '../modules/PostsListGroup';
import FollowButton from '../components/custom/FollowButton';
import apiFetch from '../utils/apiFetch';
import Caption from '../components/Caption';

function Profile({ user }) {
    const { username } = useParams();
    const [profileData, setProfileData] = useState({});
    const [followError, setFollowError] = useState(null);

    // fetch requested profile info
    useEffect(() => {
        apiFetch(`/api/users/${username}/`)
            .then((response) => response.json())
            .then((profile) => setProfileData(profile));
    }, []);

    console.log(profileData);

    // follow / unfollow behavior
    function toggleFollow() {
        const url = `/api/users/${profileData.id}/toggle-follow`;
        const method = profileData.is_followed ? 'DELETE' : 'POST';

        apiFetch(url, method)
            .then((response) => response.json())
            .then((body) => {
                if ('error' in body) {
                    setFollowError(body.error);
                } else {
                    setProfileData((prev) => ({
                        ...prev,
                        followers: prev.is_followed ? prev.followers - 1 : prev.followers + 1,
                        is_followed: !prev.is_followed,
                    }));
                }
            });
    }

    return (
        <main className="d-flex gap-4 flex-column">
            <h3>{profileData.username}</h3>
            <div className="d-flex gap-4">
                <span>
                    <span className="fw-bold">{profileData.followers}</span>{' '}
                    <span className="text-body-secondary">followers</span>
                </span>
                <span>
                    <span className="fw-bold">{profileData.following}</span>{' '}
                    <span className="text-body-secondary">following</span>
                </span>
            </div>

            {user && user.username !== profileData.username ? (
                <FollowButton isFollowing={profileData.is_followed} onClick={toggleFollow} />
            ) : null}
            {followError ? <Caption value={followError} /> : null}

            <hr />

            <h6>Posts</h6>

            <PostsListGroup fetchAddress={`/api/posts/users/${username}/`} user={user} />
        </main>
    );
}

export default Profile;
