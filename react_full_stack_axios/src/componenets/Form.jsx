import { useEffect, useState } from "react"
import { PostData, updateData } from "../API/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })
    let isEmpty = Object.keys(updateDataApi).length === 0;

    // get the updated data and add into inputfield
    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || "",

        })
    }, [updateDataApi])

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
        console.log("respone", res);
        if (res.status === 201) {
            setData([...data, res.data]);
            setAddData({ title: "", body: "" });
        }
    }
    //u[pdate post data
    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataApi.id, addData);
            console.log(res);

            setData((prev) => {
                return prev.map((currElem) => {
                    return currElem.id === res.data.id ? res.data : currElem;
                })
            })
            setAddData({ title: "", body: "" });
            setUpdateDataApi({})
        } catch (error) {
            console.log(error)
        }

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // determine whether the submit button was Add or Edit
        const action = e.nativeEvent.submitter.value;
        const choice = action && action.toLowerCase();

        if (choice === "add") {
            addPostData();
        }
        else if (choice === "edit") {
            updatePostData();
        }
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
            <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
        </form>
    )
}