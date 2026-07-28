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

    // fetch requested profile info
    useEffect(() => {
        async function loadProfile() {
            const response = await fetch(`/api/users/${username}/`);
            let profile = {};
            if (response.ok) {
                profile = await response.json();
            } else {
                profile = { error: `Could not find profile named '${username}.'` };
            }
            setProfileData(profile);
        }
        loadProfile();
    }, []);

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
            {profileData.error ? (
                profileData.error
            ) : (
                <>
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
                        <FollowButton
                            isFollowing={profileData.is_followed}
                            onClick={toggleFollow}
                        />
                    ) : null}
                    <hr />
                    <h6>Posts</h6>
                    <PostsListGroup fetchAddress={`/api/users/${username}/posts/`} user={user} />
                </>
            )}
        </main>
    );
}

export default Profile;
