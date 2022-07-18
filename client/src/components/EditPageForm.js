import {useState} from "react"
import {useHistory} from "react-router-dom"

const EditPageForm = ({pageObj, handleUpdate}) => {
    const [page, setPage] = useState({
        name: pageObj.name,
        address: pageObj.address,
        phone: pageObj.phone,
        website: pageObj.website
    });
    const history = useHistory()

    const handleChange = (e) => {
        setPage({
            ...page,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([page.name, page.address, page.website].some(val => val.trim() === "")) {
            alert("You must fill in all the information please!")
        }

       fetch(`/api/pages/${pageObj.id}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({name: page.name, address: page.address, phone: page.phone, website: page.website})
       })
       .then((resp) => {
            if (resp.status === 201) {
                resp.json()
                .then(data => {
                    handleUpdate(data)
                    history.push(`/pages`)
                })
            } else {
                resp.json()
                .then(errorObj => alert(errorObj.errors))
            }
        })
        .catch(error => alert(error.errors))  
        
    }
    return (
        <>
            <h3>Edit Post</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} type="text" name="name" value={page.name} required/><br />
                <label htmlFor="phone">Phone</label>
                <input onChange={handleChange} type="text" name="phone" value={page.phone}/><br />
                <label htmlFor="website">website</label>
                <input onChange={handleChange} type="text" name="website" value={page.website} required/><br />
                <label htmlFor="address">Address</label>
                <input onChange={handleChange} type="text" name="address" value={page.address} required/><br />
                <input type="submit" value="Update Post" />
                
            </form>


        </>
    )
}

export default EditPageForm