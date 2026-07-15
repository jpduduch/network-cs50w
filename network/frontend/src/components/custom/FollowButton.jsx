import Button from "../Button";

function FollowButton({ isFollowing, onClick }) {
    if (isFollowing) {
        return (
            <Button icon="check" hierarchy="primary" label="Following" onClick={onClick} />
        )      
    } else {
        return (
            <Button icon="add" hierarchy="secondary" label="Follow" onClick={onClick} />
        )
    }
}

export default FollowButton