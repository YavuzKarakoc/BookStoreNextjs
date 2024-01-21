"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useBookStore } from "../core/BookListProvider";
import AddBookForm from "./bookforns/addbookform";
import UpdateBookForm from "./bookforns/updatebookform";
import DeleteBookForm from "./bookforns/deletebookform";
import { bookM, authorM } from "../core/model";
import styles from "./booklist.module.css";

const BookList = () => {
    const {
        books,
        setIsBookAddForm,
        setIsBookUpdateForm,
        setIsBookDeleteForm,
        setBook,
        totalCount,
        setTotalCount,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        authors,
    } = useBookStore();
    const handleOpenAddForm = () => {
        setIsBookAddForm(true);
    };
    const handleOpenUdtadeform = (values: bookM) => {
        setIsBookUpdateForm(true);
        setBook(values);
    };

    const handleOpenDeleteform = (values: bookM) => {
        setIsBookDeleteForm(true);
        setBook(values);
    };

    // filtreleme yapmak için kullandığımız state
    const [searchTerms, setSearchTerms] = useState({
        name: "",
        price: "",
        type: "",
        language: "",
        authorId: "",
    });

    // input seçenekleriyle datanmızı filtrelediğimiz kısım. useMemo ile hesapladığımız için data veserachTerms değişmeden tekrar hesaplama yapmaz
    const filteredData = useMemo(() => {
        return books
            ? books.filter((item: bookM) => {
                  return (
                      item.name
                          .toLowerCase()
                          .includes(searchTerms.name.toLowerCase()) &&
                      item.price
                          .toLowerCase()
                          .includes(searchTerms.price.toLowerCase()) &&
                      item.type
                          .toLowerCase()
                          .includes(searchTerms.type.toLowerCase()) &&
                      item.language
                          .toLowerCase()
                          .includes(searchTerms.language.toLowerCase()) &&
                      String(item.authorId)
                          .toLowerCase()
                          .includes(searchTerms.authorId.toLowerCase())
                  );
              })
            : [];
    }, [books, searchTerms]);

    useEffect(() => {
        setTotalCount(filteredData.length);
    }, [filteredData, setTotalCount]);

    const handleSearchChange = (column: string, value: string) => {
        setSearchTerms((prevSearchTerms) => ({
            ...prevSearchTerms,
            [column]: value,
        }));
        setCurrentPage(1);
    };

    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<
        "asc" | "desc" | "default"
    >("default");

    // her tıklandığında sıralamanın yönünü belirler  asc => desc =>  default
    const handleSort = (column: string) => {
        if (sortColumn === column) {
            switch (sortDirection) {
                case "default":
                    setSortDirection("asc");
                    break;
                case "asc":
                    setSortDirection("desc");
                    break;
                case "desc":
                    setSortColumn(null);
                    setSortDirection("default");
                    break;
            }
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // burada tıkladığımız kolon adına göre sıralama yapar
    const sortedData = [...filteredData].sort((a: any, b: any) => {
        if (sortColumn) {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (aValue === null && bValue === null) {
                return 0;
            } else if (aValue === null) {
                return 1; // aValue null, bValue null değilse, bValue en önce gelmeli
            } else if (bValue === null) {
                return -1; // bValue null, aValue null değilse, aValue en önce gelmeli
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else if (
                typeof aValue === "number" &&
                typeof bValue === "number"
            ) {
                return sortDirection === "asc"
                    ? aValue - bValue
                    : bValue - aValue;
            }
        }

        return 0;
    });
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = sortedData
        ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // sayfada kaç adet eleman gözükeceğine karar vermek için
    const handleChangePageSize = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    };

    // filtrelemek için kullanılan değerleri siler ve 1. sayfaya defaulta döner
    const handleClearFilters = () => {
        setSearchTerms({
            name: "",
            price: "",
            type: "",
            language: "",
            authorId: "",
        });
        setCurrentPage(1);
        setSortColumn(null);
        setSortDirection("default");
    };

    return (
        <div>
            <AddBookForm />
            <UpdateBookForm />
            <DeleteBookForm />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">
                            <button onClick={handleClearFilters}>X</button>
                            <div className="border mt-1 bg-light">#</div>
                        </th>
                        <th scope="col" className={styles.colonhead}>
                            <input
                                className={styles.colonhead}
                                type="text"
                                placeholder="Name"
                                value={searchTerms.name}
                                onChange={(e) =>
                                    handleSearchChange("name", e.target.value)
                                }
                            />
                            <div
                                className={`border mt-1 bg-light ${styles.csp}`}
                                onClick={() => handleSort("name")}
                            >
                                {" "}
                                Kitap Adı
                            </div>
                        </th>
                        <th scope="col" className={styles.colonhead}>
                            <input
                                className={styles.colonhead}
                                type="text"
                                placeholder="Türü"
                                value={searchTerms.type}
                                onChange={(e) =>
                                    handleSearchChange("type", e.target.value)
                                }
                            />
                            <div
                                className={`border mt-1 bg-light ${styles.csp}`}
                                onClick={() => handleSort("type")}
                            >
                                {" "}
                                Kitap Türü
                            </div>
                        </th>
                        <th scope="col" className={styles.colonhead}>
                            <select
                                className={`${styles.colonhead},`}
                                value={searchTerms.authorId}
                                onChange={(e) =>
                                    handleSearchChange(
                                        "authorId",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">Tüm Yazarlar</option>
                                {authors&& authors.map((author: authorM, index: any) => (
                                    <option key={index} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                            <div
                                className={`border mt-1 bg-light ${styles.csp}`}
                                onClick={() => handleSort("authorId")}
                            >
                                {" "}
                                Yazarı
                            </div>
                        </th>
                        <th scope="col" className={styles.colonhead}>
                            <input
                                className={styles.colonhead}
                                type="text"
                                placeholder="Ücreti"
                                value={searchTerms.price}
                                onChange={(e) =>
                                    handleSearchChange("price", e.target.value)
                                }
                            />
                            <div
                                className={`border mt-1 bg-light ${styles.csp}`}
                                onClick={() => handleSort("price")}
                            >
                                {" "}
                                Ücreti
                            </div>
                        </th>
                        <th scope="col" className={styles.colonhead}>
                            <input
                                className={styles.colonhead}
                                type="text"
                                placeholder="Dili"
                                value={searchTerms.language}
                                onChange={(e) =>
                                    handleSearchChange(
                                        "language",
                                        e.target.value
                                    )
                                }
                            />
                            <div
                                className={`border mt-1 bg-light ${styles.csp}`}
                                onClick={() => handleSort("language")}
                            >
                                {" "}
                                Dili
                            </div>
                        </th>
                        <th scope="col" className={styles.colonhead}>
                            <div>
                            <button
                                onClick={handleClearFilters}
                                className="btn btn-danger p-1"
                            >
                               filtreleme sil
                            </button>
                            </div>
                            <div>
                            <button
                                onClick={handleOpenAddForm}
                                className="btn btn-success p-1"
                            >
                                Yeni Ekle
                            </button>
                            </div>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems &&
                        currentItems.map((book: bookM, index: any) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.name}</td>
                                <td>{book.type}</td>
                                <td>{book.Author.name}</td>
                                <td>{book.price} TL</td>
                                <td>{book.language}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleOpenUdtadeform(book)
                                        }
                                        className="btn btn-primary"
                                    >
                                        Güncelle
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleOpenDeleteform(book)
                                        }
                                        className="btn btn-danger"
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div>
                <div className="d-flex justify-content-center ddd">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li
                                className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                >
                                    Previous
                                </button>
                            </li>
                            {Array.from({
                                length: Math.ceil(totalCount / pageSize),
                            }).map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${
                                        currentPage === index + 1
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li
                                className={`page-item ${
                                    currentPage ===
                                    Math.ceil(totalCount / pageSize)
                                        ? "disabled"
                                        : ""
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <select
                        id="pageSizeSelect"
                        onChange={(e) =>
                            handleChangePageSize(parseInt(e.target.value))
                        }
                        value={pageSize}
                        className="border border-primary ms-2"
                        style={{ maxHeight: "38px", color: "blue" }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                
            </div>
        </div>
    );
};

export default BookList;
