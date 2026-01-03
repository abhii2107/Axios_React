import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

// craete function to get 
//get method
export const getPost = ()=>{
    return api.get("/posts");
}