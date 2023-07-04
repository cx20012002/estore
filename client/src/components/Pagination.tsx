import React from "react";

type Props = {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({currentPage, pageSize, totalItems, onPageChange}) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <ul className="inline-flex gap-3">
                <li>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={isFirstPage}
                        className={`px-3 py-2 ml-0 leading-tight text-gray-500
                        ${isFirstPage ? "text-neutral-300" : "hover:text-primary"}`}
                    >
                        Prev
                    </button>
                </li>
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-2 leading-tight text-gray-500 hover:text-gray-700 
                            ${pageNumber === currentPage ? "text-primary border-b border-b-primary cursor-auto" : ""}`}
                        >{pageNumber}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={isLastPage}
                        className={`px-3 py-2 leading-tight text-gray-500
                        ${isLastPage ? "text-neutral-300" : "hover:text-primary"}`}>
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
