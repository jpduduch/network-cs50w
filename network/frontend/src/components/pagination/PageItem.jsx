function PageItem({ value, isActive = false }) {
    return (
        <li class={`page-item ${isActive ? 'active' : ''}`}>
            <a class={'page-link'} href="#">
                {value}
            </a>
        </li>
    );
}

export default PageItem;
