function PageItem({ value, isActive = false, onClick }) {
    return (
        <li class={`page-item ${isActive ? 'active' : ''}`}>
            <a class={'page-link'} href="#" onClick={onClick}>
                {value}
            </a>
        </li>
    );
}

export default PageItem;
