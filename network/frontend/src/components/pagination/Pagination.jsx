import { Link } from 'react-router-dom';
import PageItem from './PageItem';

function Pagination({ page, onSelect }) {
    const { current: currentPage, range: pageRange, has_prev: hasPrev, has_next: hasNext } = page;

    let min = currentPage - 2;
    let max = currentPage + 2;

    // adjusts if current page is in beginning
    if (min < 1) {
        max += 1 - min;
        min = 1;
    }

    // adjusts if current page is nearing the page range
    if (max > pageRange) {
        min -= max - pageRange;
        max = pageRange;
    }

    // if total page range < 5, this prevents to showing a range outside real page range
    min = Math.max(min, 1);
    max = Math.min(max, pageRange);

    const pagesArray = [];
    for (let i = min; i <= max; i++) {
        pagesArray.push(i);
    }

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
            {pageRange > 1
                ? pagesArray?.map((number) => (
                      <PageItem
                          key={number}
                          value={number}
                          onClick={() => {
                              onSelect(number);
                          }}
                          isActive={number === currentPage ? true : false}
                      />
                  ))
                : null}
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
