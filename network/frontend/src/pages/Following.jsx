import { useEffect, useState } from 'react';
import PostsListGroup from '../modules/PostsListGroup';

function Following({ user }) {
    const [pageData, setPageData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/following/')
            .then((response) => response.json())
            .then((body) => {
                setPageData(body);
                setIsLoading(false);
            });
    }, []);

    console.log(pageData.posts);

    if (!user) {
        window.location.href = '/login/';
    }

    return (
        <div>
            {isLoading ? 'Loading posts…' : null}
            {pageData.posts?.length === 0 && isLoading === false ? (
                'You are not following anyone.'
            ) : (
                <PostsListGroup posts={pageData.posts} user={user} />
            )}
        </div>
    );
}

export default Following;
