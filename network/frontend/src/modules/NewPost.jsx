import { useState } from 'react';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import getCSRFToken from '../utils/csrf';

function NewPost() {

    const [content, setContent] = useState("");
    const [feedback, setFeedback] = useState([]);

    function handleSubmit() {
        fetch('/api/send-post', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken()
            },
            body: JSON.stringify({ content })
        })
        .then(response => response.json())
        .then(feedback => {
            if ("error" in feedback) {
                setFeedback(feedback.error.content);
            } else {
                setFeedback(feedback.message);
                setContent("");
            }
        })
    }
    
    return (
        <div className='d-flex flex-column gap-2'>
            <TextArea label="What is on your mind?" onChange={ setContent } value={ content } caption={ feedback } />
            <Button label="Post" onClick={ handleSubmit } />
        </div>
    )
}

export default NewPost;