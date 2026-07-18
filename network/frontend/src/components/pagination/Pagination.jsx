import PageItem from './PageItem';

function Pagination({ hasPrev, hasNext, numPages }) {
    return (
        <ul className="pagination">
            {hasPrev ? <PageItem value="Previous" /> : null}
            {numPages?.map((page) => (
                <PageItem value={page.number} />
            ))}
            {hasNext ? <PageItem value="Next" /> : null}
        </ul>
    );
}

export default Pagination;
