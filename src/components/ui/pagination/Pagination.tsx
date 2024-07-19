interface PaginationProps {
    page: number;
    size: number;
    totalItems: number;
    switchPage: (arg: number) => void;
}

export default function Pagination ({ page, size, totalItems, switchPage }: PaginationProps) {

    const totalPages = Math.ceil(totalItems / size);

    return (
        <div className="pagination">
            <button 
                onClick={() => switchPage(page - 1)} 
                disabled={page === 1}
            >
                Previous
            </button>

            <span>{`Page ${page} of ${totalPages}`}</span>

            <button 
                onClick={() => switchPage(page + 1)} 
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};