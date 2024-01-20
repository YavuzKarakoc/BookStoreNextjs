"use client";
import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {getAllBooks} from "./request"

const url = process.env.API_URL
// türleri belirtiyoruz
export type BookStoreContextProps = {
    data: any;
    books:any;
};

// initial değerlerini giriyoruz
export const initialListView: BookStoreContextProps = {
    data: null,
    books:null,
};

const ListViewContext =
    createContext<BookStoreContextProps>(initialListView);

interface BookStoreContextProviderProps {
    children: ReactNode;
}

const BookStoreListProvider: React.FC<BookStoreContextProviderProps> = ({
    children,
}) => {
    const [books, setBooks] = useState<any>(initialListView.books);
    const [data, setData] = useState<any>(initialListView.data);

    


    useEffect(() => {
        getAllBooks().then((data)=>
        setBooks(data)
        )
        
    }, []);

    return (
        <ListViewContext.Provider
            value={{
                data,
                books
            }}
        >
            {children}
        </ListViewContext.Provider>
    );
};

const useBookStore = (): BookStoreContextProps => useContext(ListViewContext);

export { BookStoreListProvider, useBookStore };