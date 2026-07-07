import { useState } from 'react';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import getCSRFToken from '../utils/csrf';

function NewPost({ onUpdate }) {

    const [content, setContent] = useState("");
    const [message, setMessage] = useState([]);

    function handleSubmit() {
        fetch('/api/send-post/', {
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
                setMessage(feedback.error.content);
            } else {
                setMessage(feedback.message);
                setContent("");
                onUpdate();
            }
        })
    }
    
    return (
        <div className='d-flex flex-column gap-2 py-5'>
            <TextArea label="What is on your mind?" onChange={ setContent } value={ content } caption={ message } />
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <Button label="Post" hierarchy='primary' onClick={ handleSubmit } />
            </div>
        </div>
    )
}

export default NewPost