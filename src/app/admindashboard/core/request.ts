import axios from "axios";
import { bookM, authorM } from "./model";

const baseUrl= "http://localhost:5000/api"


const getAllBooks= async()=>{
    try {
        const response = await axios.get(
            `${baseUrl}/book/books`
        );
        return response.data
    } catch (error) {
        console.error("Error fetching festivals:", error);
        throw error;
    }
}

const createBook= async(book:bookM)=>{
    try {
        const response = await axios.post(
            `${baseUrl}/book/create-book`,book
        );
        return response.data
    } catch (error) {
        console.error("Error fetching festivals:", error);
        throw error;
    }
}

const updateBook= async(book:bookM)=>{
    try {
        const response = await axios.put(
            `${baseUrl}/book/update-book?id=${book.id}`,book
        );
        return response.data
    } catch (error) {
        console.error("Error fetching festivals:", error);
        throw error;
    }
}

const deleteBook= async(id:any)=>{
    try {
        const response = await axios.delete(
            `${baseUrl}/book/delete-book/?id=${id}`
        );
        return response.data
    } catch (error) {
        console.error("Error fetching festivals:", error);
        throw error;
    }
}

const getAllAuthor= async()=>{
    try {
        const response = await axios.get(
            `${baseUrl}/author/authors`
        );
        return response.data
    } catch (error) {
        console.error("Error fetching festivals:", error);
        throw error;
    }
}

const createAuthor= async(book:bookM)=>{
    try {
        const response = await axios.post(
            `${baseUrl}/book/create-author`
        );
        return response.data
    } catch (error) {
        console.error("Error fetching festivals:", error);
        throw error;
    }
}

export {getAllBooks, createBook, updateBook, deleteBook, getAllAuthor, createAuthor}