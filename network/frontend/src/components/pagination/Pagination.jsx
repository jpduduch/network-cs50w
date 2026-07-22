import { Link } from 'react-router-dom';
import PageItem from './PageItem';

function Pagination({ hasPrev, hasNext, numPages, currentPage }) {
    // const [next, setNext] = useState(currentPage + 1);
    // const [prev, setPrev] = useState(currentPage - 1);

    // async function goToPage(number) {
    //     const response = await fetch(`/api/posts/?page=${number}`);
    //     const data = await response.json();
    // }

    return (
        <ul className="pagination">
            {hasPrev ? <PageItem value="Previous" /> : null}
            {/* {numPages?.map((page) => (
                <PageItem value={page.number} />
            ))} */}
            {hasNext ? <PageItem value="Next" /> : null}
        </ul>
    );
}

export default Pagination;
