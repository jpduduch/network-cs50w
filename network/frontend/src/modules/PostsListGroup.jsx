import Pagination from '../components/pagination/Pagination';
import Post from '../components/Post';
import { useEffect, useState } from 'react';

function PostsListGroup({ fetchAddress, user, newPost = 0 }) {
    const [posts, setPosts] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});

    // update post list after submissions
    useEffect(() => {
        async function fetchPageData() {
            const response = await fetch(fetchAddress);
            const data = await response.json();
            setPosts(data.posts);
            setPaginationInfo(data.page);
        }
        fetchPageData();
    }, [newPost]);

    return (
        <div>
            <ul className="d-flex flex-column gap-2 p-0">
                {posts?.map((post) => (
                    <Post key={post.id} metadata={post} user={user} />
                ))}
            </ul>
            <Pagination
                hasPrev={paginationInfo?.has_prev}
                hasNext={paginationInfo?.has_next}
                numPages={3}
            />
        </div>
    );
}

export default PostsListGroup;
