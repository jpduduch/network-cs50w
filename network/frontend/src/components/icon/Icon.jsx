import './icon.css'

function Icon({ value }) {
    return (
        <span className="material-icons-outlined icon">
            {value}
        </span>
    )
}

export default Icon