import { useState } from "react";

function TextArea({ label }) {

    const [value, setValue] = useState();

    function updateValue(event) {
        setValue(event.key)
    }

    return (
        <div className="form-floating">
            <textarea className="form-control" id="new-post" onChange={(event) => updateValue(event)}>{value}</textarea>
            <label htmlFor="new-post">{label}</label>
        </div>
    )
}

export default TextArea