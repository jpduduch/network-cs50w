import { useEffect, useState } from 'react';
import PostsListGroup from '../modules/PostsListGroup';

function Following({ user }) {
    const [hasFollowers, setHasFollowers] = useState(false);
    if (!user) {
        window.location.href = '/login/';
    }

    useEffect(() => {
        async function followingInfo() {
            const response = await fetch(`/api/users/${user.username}/`);
            const metadata = await response.json();
            metadata.following !== 0 ? setHasFollowers(true) : setHasFollowers(false);
        }
        followingInfo();
    }, [user]);

    return (
        <div>
            {hasFollowers ? (
                <PostsListGroup fetchAddress={'/api/posts/following/'} user={user} />
            ) : (
                'You are not following anyone.'
            )}
        </div>
    );
}

export default Following;
