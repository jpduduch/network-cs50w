import Pagination from '../components/pagination/Pagination';
import Post from '../components/Post';
import { useEffect, useState } from 'react';

function PostsListGroup({ postsArray, user }) {
    console.log(postsArray.page_info);
    return (
        <div>
            <ul className="d-flex flex-column gap-2 p-0">
                {postsArray.page_info?.content.map((contents) => (
                    <Post key={contents.id} metadata={contents} user={user} />
                ))}
            </ul>
            {/* <Pagination
                hasPrev={postsArray.page_info.has_prev}
                hasNext={postsArray.page_info.has_next}
                numPages={3}
            /> */}
        </div>
    );
}

export default PostsListGroup;
