import Pagination from '../components/pagination/Pagination';
import Post from '../components/Post';
import { useEffect, useState } from 'react';
import apiFetch from '../utils/apiFetch';

function PostsListGroup({ fetchAddress, user, newPost = 0 }) {
    const [posts, setPosts] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    // update post list after submissions
    useEffect(() => {
        async function fetchPageData() {
            setIsLoading(true);
            setPosts([]);

            const response = await apiFetch(`${fetchAddress}?page=${page}`);
            const data = await response.json();
            setPosts(data.posts);
            setPaginationInfo(data.page);
            setIsLoading(false);
        }
        fetchPageData();
    }, [newPost, page, fetchAddress]);

    function loadPage(requestedPage = 1) {
        setPage(requestedPage);
    }

    return (
        <div>
            {isLoading ? 'Loading posts…' : null}

            {posts.length === 0 && !isLoading ? (
                'No posts.'
            ) : (
                <ul className="d-flex flex-column gap-2 p-0">
                    {posts?.map((post) => (
                        <Post key={post.id} metadata={post} user={user} />
                    ))}
                </ul>
            )}
            <Pagination page={paginationInfo} onSelect={loadPage} />
        </div>
    );
}

export default PostsListGroup;
