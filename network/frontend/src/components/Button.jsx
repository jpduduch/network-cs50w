import Icon from './icon/Icon.jsx'

function Button({ label, icon, onClick, hierarchy }) {

    let btnVariant;

    if (hierarchy === 'primary') {
        btnVariant = 'btn-primary';
    } else if (hierarchy === 'secondary') {
        btnVariant = 'btn-outline-primary';
    }

    return (
        <button className={`d-flex btn ${btnVariant} justify-content-center align-items-center align-self-start gap-2`}  onClick={onClick}>
            <Icon value={ icon } /> 
            {label}
        </button>
    )
}

export default Button