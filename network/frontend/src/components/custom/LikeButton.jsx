import Button from "../Button";

function LikeButton ({ label, hasLike, onClick }) {
    if (hasLike) {
        return (
            <Button icon='thumb_up' label={label} hierarchy="primary" onClick={onClick}  />
        )
    } else {
        return (
            <Button icon='thumb_up' label={label} hierarchy="secondary" onClick={onClick} />
        )
    }
}

export default LikeButton