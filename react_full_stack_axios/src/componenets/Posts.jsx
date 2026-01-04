import { useEffect, useState } from "react";
import { deletePost, getPost } from "../API/PostApi";
import "../App.css"
import { Form } from "./Form";


export const Posts = () => {
    const [data, setData] = useState([]);
    const[updateDataApi,setUpdateDataApi] = useState({});

    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data);
        setData(res.data);
    }

    useEffect(() => {
        getPostData();
    }, [])

    //function to delete post
    const handleDeleteButton = async (id) => {
        try {
            const res = await deletePost(id);
            if (res.status == 200) {
                const newUpdatedPosts = data.filter((currPost) => {
                    return currPost.id != id;
                })
                setData(newUpdatedPosts);
            }
            else {
                console.log("failed to delete the post:", res.status);
            }
        } catch (error) {
            console.log(error)
        }

    }
    // handle post data
    const handleUpdatePost =(currElem)=>{
        setUpdateDataApi(currElem);
    }


    return (
        <>
            <section className="class-form">
                <Form data = {data} setData = {setData} updateDataApi = {updateDataApi} setUpdateDataApi = {setUpdateDataApi}/>
                {/* we are sending this prosp becasuse we are adding data after creating a post */}
            </section>
            <section className="section-post">
                <ul>
                    {
                        data.map((currElem) => {
                            const { id, body, title } = currElem
                            return (
                                <li key={id}>
                                    <p>Title: {title}</p>
                                    <p>Body: {body}</p>
                                    <button className="btn-edit" onClick={()=>handleUpdatePost(currElem)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDeleteButton(id)}>Delete</button>
                                </li>
                            )
                        })
                    }

                </ul>
            </section>
        </>
    )
}