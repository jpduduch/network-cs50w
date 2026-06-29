import Button from './Button'
import Icon from './icon/Icon'

function Post({ content, creator, timestamp, likes }) {
    // each post should include the username of the poster, the post content itself, the date and time at which the post was made, and the number of “likes” the post has (this will be 0 for all posts until you implement the ability to “like” a post later).
    return(
        <div className="d-flex flex-column gap-2">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action d-flex flex-column gap-3 py-3" aria-current="true">
                    <div className='d-flex flex-column'>
                        <div class="d-flex w-100 justify-content-between">
                            <small>username</small>
                            <small>3 days ago</small>
                        </div>
                        <p class="mb-1">Some placehdaolder content in a paragraph.</p>
                    </div>
                    <Button icon={'thumb_up'} label={'14 likes'} />
                </a>
            </div>
        </div>
    )
}

export default Post