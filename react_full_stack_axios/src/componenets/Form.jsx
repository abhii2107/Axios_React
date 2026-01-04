import { useEffect, useState } from "react"
import { PostData } from "../API/PostApi";

export const Form = ({ data, setData,updateDataApi,setUpdateApi }) => {
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    // get the updated data and add into inputfield
    useEffect(()=>{
        updateDataApi && setAddData({
            title:updateDataApi.title || "",
            body:updateDataApi.body || "",

        })
    },[updateDataApi])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            console.log(prev);
            return {
                ...prev,
                [name]: value


                // Dynamic key

                // If name = "title" → updates title

                // If name = "body" → updates body
            }
        })
    }
    const addPostData = async () => {
        const res = await PostData(addData);
        console.log("respone",res);
        if (res.status === 201) {
            setData([...data, res.data]);
            setAddData({title:"",body:""});
        }
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        addPostData();
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input type="text"
                    autoComplete="off"
                    id="title"
                    name="title"
                    placeholder="Add Title"
                    value={addData.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="body"></label>
                <input type="text"
                    autoComplete="off"
                    id="body"
                    name="body"
                    placeholder="Add Post"
                    value={addData.body}
                    onChange={handleInputChange}

                />
            </div>
            <button type="submit">Add</button>
        </form>
    )
}