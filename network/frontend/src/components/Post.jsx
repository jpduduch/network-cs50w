import apiFetch from '../utils/apiFetch';
import Button from './Button';
import LikeButton from './custom/LikeButton';
import Icon from './icon/Icon';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TextArea from './TextArea';
import Caption from './Caption';
import Modal from './Modal';

function Post({ metadata, user }) {
    // Post component
    const [postContent, setPostContent] = useState(metadata.content);
    const [isEdited, setIsEdited] = useState(metadata.is_edited);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateContent, setUpdateContent] = useState(metadata.content);
    const [captionMessage, setCaptionMessage] = useState('');

    async function updatePost() {
        const response = await apiFetch(`/api/posts/${metadata.id}/update/`, 'PATCH', {
            content: updateContent,
        });
        if (!response.ok) {
            setCaptionMessage('Something went wrong. Try again.');
            return;
        }
        const feedback = await response.json();
        if ('error' in feedback) {
            setCaptionMessage(feedback.error);
        } else {
            setIsModalOpen(false);
            setPostContent(feedback.content);
            setIsEdited(true);
        }
    }

    return (
        <>
            <div className="d-flex flex-column gap-2">
                <div
                    class="list-group list-group-item list-group-item-action d-flex flex-column gap-3 py-3"
                    aria-current="true"
                >
                    <div className="d-flex flex-column gap-2">
                        <div class="d-flex w-100 justify-content-between">
                            <Link to={`/user/${metadata.author}`}>
                                {' '}
                                <small>{metadata.author}</small>{' '}
                            </Link>
                            <small>{`${isEdited ? '(Edited)' : ''} ${metadata.date}`}</small>
                        </div>
                        <p class="mb-1">{postContent}</p>
                    </div>
                    <div id="button-row" className="d-flex flex-row justify-content-between">
                        <LikeButton
                            likeCount={metadata.likes}
                            hasLike={metadata.has_like}
                            postID={metadata.id}
                            user={user}
                        />
                        {user && metadata.author === user.username ? (
                            <div className="d-flex flex-row justify-content-end gap-2">
                                <Button
                                    label={'Edit post'}
                                    hierarchy={'secondary'}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    title="Edit post"
                    onClose={() => setIsModalOpen(false)}
                    primaryAction={updatePost}
                >
                    <TextArea
                        label="Edit post…"
                        value={updateContent}
                        onChange={setUpdateContent}
                        caption={captionMessage}
                    />
                </Modal>
            )}
        </>
    );
}

export default Post;
