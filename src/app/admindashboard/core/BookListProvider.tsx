"use client";
import axios from "axios";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { getAllBooks, getAllAuthor } from "./request";
import { bookM } from "./model";

// türleri belirtiyoruz
export type BookStoreContextProps = {
    data: any;
    books: any;
    authors: any;
    isBookAddForm: boolean;
    setIsBookAddForm: Dispatch<SetStateAction<boolean>>;
    isBookUpdateForm: boolean;
    setIsBookUpdateForm: Dispatch<SetStateAction<boolean>>;
    isBookDeleteForm: boolean;
    setIsBookDeleteForm: Dispatch<SetStateAction<boolean>>;
    book: bookM | undefined;
    setBook: Dispatch<SetStateAction<bookM | undefined>>;
};

// initial değerlerini giriyoruz
export const initialListView: BookStoreContextProps = {
    data: null,
    books: null,
    authors: null,
    isBookAddForm: false,
    setIsBookAddForm: () => {},
    isBookUpdateForm: false,
    setIsBookUpdateForm: () => {},
    isBookDeleteForm:false,
    setIsBookDeleteForm: () => {},
    book: undefined,
    setBook: () => {},
};

const ListViewContext = createContext<BookStoreContextProps>(initialListView);

interface BookStoreContextProviderProps {
    children: ReactNode;
}

const BookStoreListProvider: React.FC<BookStoreContextProviderProps> = ({
    children,
}) => {
    const [books, setBooks] = useState<any>(initialListView.books);
    const [authors, setAuthors] = useState<any>(initialListView.authors);
    const [data, setData] = useState<any>(initialListView.data);
    const [isBookAddForm, setIsBookAddForm] = useState<any>(
        initialListView.isBookAddForm
    );
    const [isBookUpdateForm, setIsBookUpdateForm] = useState<any>(
        initialListView.isBookUpdateForm
    );
    const [isBookDeleteForm, setIsBookDeleteForm] = useState<any>(
        initialListView.isBookDeleteForm
    );
    const [book, setBook] = useState<any>(initialListView.book);

    useEffect(() => {
        getAllBooks().then((data) => setBooks(data));
    }, [isBookAddForm, isBookUpdateForm, isBookDeleteForm]);
    useEffect(() => {
        getAllAuthor().then((data) => setAuthors(data));
    }, []);

    return (
        <ListViewContext.Provider
            value={{
                data,
                books,
                authors,
                isBookAddForm,
                setIsBookAddForm,
                isBookUpdateForm,
                setIsBookUpdateForm,
                isBookDeleteForm,
                setIsBookDeleteForm,
                book,
                setBook,
            }}
        >
            {children}
        </ListViewContext.Provider>
    );
};

const useBookStore = (): BookStoreContextProps => useContext(ListViewContext);

export { BookStoreListProvider, useBookStore };
