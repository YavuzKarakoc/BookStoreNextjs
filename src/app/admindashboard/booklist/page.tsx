"use client";
import React from "react";
import { useBookStore } from "../core/BookListProvider";

const BookList = () => {
    const { books } = useBookStore();

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kitap Adı</th>
                        <th scope="col">Türü</th>
                        <th scope="col">Yazarı</th>
                        <th scope="col">Ücreti</th>
                        <th scope="col">Dili</th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map((book: any) => (
                        <tr>
                            <th scope="row">1</th>
                            <td>{book.name}</td>
                            <td>{book.type}</td>
                            <td>{book.Author.name}</td>
                            <td>{book.price}</td>
                            <td>{book.language}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
