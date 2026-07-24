import { Link } from 'react-router-dom';
import PageItem from './PageItem';

function Pagination({ page, onSelect }) {
    const { current: currentPage, range: pageRange, has_prev: hasPrev, has_next: hasNext } = page;

    return (
        <ul className="pagination">
            {hasPrev ? (
                <PageItem
                    value="Previous"
                    onClick={() => {
                        onSelect(currentPage - 1);
                    }}
                />
            ) : null}
            {hasNext ? (
                <PageItem
                    value="Next"
                    onClick={() => {
                        onSelect(currentPage + 1);
                    }}
                />
            ) : null}
        </ul>
    );
}

export default Pagination;
