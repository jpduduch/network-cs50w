import Caption from "./Caption"

function TextArea({ label, value, caption, onChange }) {
    return (
        <div className="form-floating">
            <textarea 
                className="form-control"
                id="new-post" 
                onChange={ (event) => { onChange(event.target.value) } }
                value={value} 
            />
            <label htmlFor="new-post">{label}</label>
            <Caption value={ caption } />
        </div>
    )
}

export default TextArea