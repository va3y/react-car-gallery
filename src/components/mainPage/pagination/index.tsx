import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cn from "classnames";

const PaginationButton: React.FC<
	PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
	return (
		<button
			className={cn(
				"text-primary hover:underline",
				!props.disabled && "text-primary hover:underline",
				props.disabled && "text-text opacity-60"
			)}
			{...props}
		/>
	);
};

export const Pagination: React.FC<{
	onChangePage(newPage: number): void;
	currentPage?: number;
	pagesTotal?: number;
}> = ({ onChangePage: changePage, currentPage = 1, pagesTotal = 1 }) => {
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === pagesTotal;

	return (
		<div className='flex justify-around max-w-sm mx-auto text-12'>
			<PaginationButton onClick={() => changePage(1)} disabled={isFirstPage}>
				First
			</PaginationButton>
			<PaginationButton
				onClick={() => changePage(Math.max(currentPage - 1, 1))}
				disabled={isFirstPage}>
				Previous
			</PaginationButton>
			<div>
				Page {currentPage} of {pagesTotal}
			</div>
			<PaginationButton
				disabled={isLastPage}
				onClick={() => changePage(Math.min(currentPage + 1, pagesTotal))}>
				Next
			</PaginationButton>
			<PaginationButton
				disabled={isLastPage}
				onClick={() => changePage(pagesTotal)}>
				Last
			</PaginationButton>
		</div>
	);
};
