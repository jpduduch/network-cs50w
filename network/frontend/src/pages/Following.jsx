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
            setHasFollowers(metadata.following !== 0 ? true : false);
        }
        followingInfo();
    }, [user]);

    return (
        <div>
            <PostsListGroup fetchAddress={'/api/posts/following/'} user={user} />
        </div>
    );
}

export default Following;
