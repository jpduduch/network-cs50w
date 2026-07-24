import apiFetch from '../utils/apiFetch';
import Button from './Button';
import LikeButton from './custom/LikeButton';
import Icon from './icon/Icon';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Post({ metadata, user }) {
    const [like, setLike] = useState({
        isTrue: metadata.has_like,
        count: metadata.likes,
    });

    function toggleLike() {
        if (!user) {
            window.location.href = '/login/';
        }

        let method;

        if (like.isTrue && user) {
            setLike((prev) => ({
                ...prev,
                isTrue: false,
                count: prev.count - 1,
            }));

            method = 'DELETE';
        } else if (!like.isTrue && user) {
            setLike((prev) => ({
                ...prev,
                isTrue: true,
                count: prev.count + 1,
            }));

            method = 'POST';
        }

        apiFetch(`/api/posts/${metadata.id}/toggle-like/`, method);
    }

    return (
        <div className="d-flex flex-column gap-2">
            <div
                class="list-group list-group-item list-group-item-action d-flex flex-column gap-3 py-3"
                aria-current="true"
            >
                <div className="d-flex flex-column">
                    <div class="d-flex w-100 justify-content-between">
                        <Link to={`/user/${metadata.author}`}>
                            {' '}
                            <small>{metadata.author}</small>{' '}
                        </Link>
                        <small>{metadata.date}</small>
                    </div>
                    <p class="mb-1">{metadata.content}</p>
                </div>
                <LikeButton likeCount={like.count} hasLike={like.isTrue} onClick={toggleLike} />
            </div>
        </div>
    );
}

export default Post;
