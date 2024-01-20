import axios from "axios";


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

export {getAllBooks}