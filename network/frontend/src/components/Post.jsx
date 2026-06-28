import Button from './Button'

function Post({ content, creator, timestamp, likes }) {
    // each post should include the username of the poster, the post content itself, the date and time at which the post was made, and the number of “likes” the post has (this will be 0 for all posts until you implement the ability to “like” a post later).
    return(
        <div className="d-flex flex-column gap-1">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action d-flex flex-column" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <small>username</small>
                        <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small>14 likes.</small>
                    <div className='btn-group btn-group-sm flex-wrap'>
                        <Button label="Like" /> 
                    </div>
                </a>
            </div>
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <small>username</small>
                        <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small>14 likes.</small>
                </a>
            </div>
        </div>
    )
}

export default Post