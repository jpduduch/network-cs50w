import Pagination from '../components/pagination/Pagination';
import Post from '../components/Post';
import { useEffect, useState } from 'react';

function PostsListGroup({ postsArray, user }) {
    const pages = [{ number: 1 }, { number: 2 }, { number: 3 }];

    return (
        <div>
            <ul className="d-flex flex-column gap-2 p-0">
                {postsArray?.map((contents) => (
                    <Post key={contents.id} metadata={contents} user={user} />
                ))}
            </ul>
            <Pagination hasPrev={false} hasNext={true} numPages={pages} />
        </div>
    );
}

export default PostsListGroup;
