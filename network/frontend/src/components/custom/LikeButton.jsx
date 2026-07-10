import Button from "../Button";

function LikeButton ({ likeCount, hasLike, onClick }) {

    if (hasLike) {
        return (
            <Button icon='thumb_up' label={likeCount} hierarchy="primary" onClick={onClick}  />
        )
    } else {
        return (
            <Button icon='thumb_up' label={likeCount} hierarchy="secondary" onClick={onClick} />
        )
    }
}

export default LikeButton