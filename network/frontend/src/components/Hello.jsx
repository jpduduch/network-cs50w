// placeholder component, delete after done
import { useState } from "react"

function Hello() {

    const [message, setMessage] = useState();

    fetch('api/hello')
    .then(response => response.json())
    .then(msg => setMessage(msg.message))

    return (
        <div>
            {message}
        </div>
    )
}

export default Hello