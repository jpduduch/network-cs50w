import Button from '../components/Button';
import TextArea from '../components/TextArea';

function NewPost() {
    
    return (
        <div className='d-flex flex-column gap-2'>
            <TextArea label="What is on your mind?" />
            <Button label="Post" />
        </div>
    )
}

export default NewPost