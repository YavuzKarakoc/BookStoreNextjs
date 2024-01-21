"use client";
import React from "react";
import { useBookStore } from "../core/BookListProvider";
import AddBookForm from "./bookforns/addbookform";
import UpdateBookForm from "./bookforns/updatebookform";
import DeleteBookForm from "./bookforns/deletebookform";
import { bookM } from "../core/model";

const BookList = () => {
    const { books, setIsBookAddForm, setIsBookUpdateForm, setIsBookDeleteForm, setBook } = useBookStore();
    const handleOpenAddForm=() =>{
        setIsBookAddForm(true)
    }
    const handleOpenUdtadeform=(values:bookM)=>{
        setIsBookUpdateForm(true)
        setBook(values)
    }

    const handleOpenDeleteform=(values:bookM)=>{
        setIsBookDeleteForm(true)
        setBook(values)
    }

    return (
        <div>
            <AddBookForm/>
            <UpdateBookForm/>
            <DeleteBookForm/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kitap Adı</th>
                        <th scope="col">Türü</th>
                        <th scope="col">Yazarı</th>
                        <th scope="col">Ücreti</th>
                        <th scope="col">Dili</th>
                        <th scope="col">
                        <button onClick={handleOpenAddForm} className="btn btn-success">Yeni Ekle</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books &&
                        books.map((book: bookM, index: any) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.name}</td>
                                <td>{book.type}</td>
                                <td>{book.Author.name}</td>
                                <td>{book.price} TL</td>
                                <td>{book.language}</td>
                                <td>
                                    <button onClick={()=>handleOpenUdtadeform(book)} className="btn btn-primary">Güncelle</button>
                                    <button onClick={()=>handleOpenDeleteform(book)} className="btn btn-danger">Sil</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
