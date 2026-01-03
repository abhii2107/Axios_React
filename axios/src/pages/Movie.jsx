// import axios from "axios"
import { useEffect, useState } from "react"
import { Card } from "../component/UI/Card";
import { getMovie } from "../Services/GetServices";
export const Movie =()=>{
    // usestate hook to store the result
    const[data,setData] = useState([]);
    // const Api = "https://www.omdbapi.com/?s=guardians&apikey=526134df"

    // 
    const getMovieData =async()=>{
        try {
            // const res = await axios.get(Api)
            const res = await getMovie();
            console.log(res.data.Search);
            setData(res.data.Search);
        } catch (error) { 
            // errors properties that you can further use
            console.error("Error message",error.message);
            console.error("Error status",error.response.status);
            console.error("Error data",error.response.data );
            
        }

    }

    useEffect(()=>{
        getMovieData();
    },[])


    return <ul>
        {
            data.map((currElem)=>{
                return <Card key ={currElem.imdbID} movieData = {currElem}/>
            })
        }
    </ul>
}