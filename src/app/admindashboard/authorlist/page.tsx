"use client";
import React from "react";
import { useBookStore } from "../core/BookListProvider";

const Authorlist = () => {
    const { authors } = useBookStore();
    return (
        <div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Yazar Adı</th>
                            <th scope="col">
                                <button className="btn btn-success">
                                    Yeni Ekle
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors &&
                            authors.map((book: any, index: any) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{book.name}</td>
                                    <td>
                                    <button className="btn btn-primary">Güncelle</button>
                                    <button className="btn btn-danger">Sil</button>
                                </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Authorlist;
