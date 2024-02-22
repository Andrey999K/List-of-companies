import React, { useState } from "react";
import paginate from "../utils/paginate.ts";

const usePaginate = (initialCurrentPage: number, initialPageSize: number, data: Array<any>) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const countPages = Math.ceil(data.length / pageSize);
  const currentItems = paginate(data, currentPage, pageSize);
  const handleEditCountPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPageSize(Number(e.target.value));
  };
  const prevPage = () => (currentPage !== 1 ? setCurrentPage(prevState => prevState - 1) : "");
  const nextPage = () => (currentPage !== countPages ? setCurrentPage(prevState => prevState + 1) : "");
  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    countPages,
    currentItems,
    prevPage,
    nextPage,
    handleEditCountPage
  };
};

export default usePaginate;
