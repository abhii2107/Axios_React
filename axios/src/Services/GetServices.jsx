// in the proffesional use of axios we will create an instanvce of the axios then pass the object

import axios from "axios";

const api = axios.create({
    baseURL:"https://www.omdbapi.com/"
})

// creating a get request function
export const getMovie = ()=>{
    return api.get("?s=guardians&apikey=526134df");
}