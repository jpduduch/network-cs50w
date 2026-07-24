import { Link } from 'react-router-dom';
import PageItem from './PageItem';

function Pagination({ hasPrev, hasNext, numPages, currentPage }) {
    return (
        <ul className="pagination">
            {hasPrev ? <PageItem value="Previous" /> : null}
            {hasNext ? <PageItem value="Next" /> : null}
        </ul>
    );
}

export default Pagination;
