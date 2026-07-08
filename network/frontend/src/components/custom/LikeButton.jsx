import Button from "../Button";

function LikeButton ({ likeCount, hasLike, onClick }) {

    function toggleLike() {
        
    }

    if (hasLike) {
        return (
            <Button icon='thumb_up' label={likeCount} hierarchy="primary" onClick={toggleLike}  />
        )
    } else {
        return (
            <Button icon='thumb_up' label={likeCount} hierarchy="secondary" onClick={toggleLike} />
        )
    }
}

export default LikeButton