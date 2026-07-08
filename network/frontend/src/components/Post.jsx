import apiPOST from '../utils/apiPOST';
import Button from './Button'
import LikeButton from './custom/LikeButton'
import Icon from './icon/Icon'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Post({ content, creator, timestamp, likes, id, hasLike }) {
    // each post should include the username of the poster, the post content itself, the date and time at which the post was made, and the number of “likes” the post has (this will be 0 for all posts until you implement the ability to “like” a post later).

    return(
        <div className="d-flex flex-column gap-2">
            <div class="list-group list-group-item list-group-item-action d-flex flex-column gap-3 py-3" aria-current="true">
                <div className='d-flex flex-column'>
                    <div class="d-flex w-100 justify-content-between">
                        <Link to={`/user/${creator}`}> <small>{creator}</small> </Link>
                        <small>{timestamp}</small>
                    </div>
                    <p class="mb-1">{content}</p>
                </div>
                <LikeButton likeCount={likes} hasLike={hasLike} />
            </div>
        </div>
    )
}

export default Post