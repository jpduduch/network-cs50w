function TextArea({ label, value, onChange }) {
    return (
        <div className="form-floating">
            <textarea 
                className="form-control"
                id="new-post" 
                onChange={ (event) => { onChange(event.target.value) } }
                value={value} 
            />
            <label htmlFor="new-post">{label}</label>
        </div>
    )
}

export default TextArea