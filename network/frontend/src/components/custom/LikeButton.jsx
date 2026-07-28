import { useState } from 'react';
import Button from '../Button';
import apiFetch from '../../utils/apiFetch';

function LikeButton({ user, likeCount, hasLike, postID }) {
    const [like, setLike] = useState({
        isTrue: hasLike,
        count: likeCount,
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

        apiFetch(`/api/posts/${postID}/toggle-like/`, method);
    }
    if (like.isTrue) {
        return (
            <Button icon="thumb_up" label={like.count} hierarchy="primary" onClick={toggleLike} />
        );
    } else {
        return (
            <Button icon="thumb_up" label={like.count} hierarchy="secondary" onClick={toggleLike} />
        );
    }
}

export default LikeButton;
