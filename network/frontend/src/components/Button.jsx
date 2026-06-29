import Icon from './icon/Icon.jsx'

function Button({ label, icon, onClick }) {
    return (
        <button className="d-flex btn btn-primary justify-content-center align-items-center align-self-start gap-2" onClick={onClick}>
            <Icon value={ icon } /> 
            {label}
        </button>
    )
}

export default Button