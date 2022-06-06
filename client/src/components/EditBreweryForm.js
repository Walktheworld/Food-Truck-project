import {useState} from "react"
// import { MessageContext } from "../context/message";


const EditBreweryForm = ({brewObj, handleUpdate}) => {
    const [brewery, setBrewery] = useState({
        name: brewObj.name,
        address: brewObj.address,
        phone: brewObj.phone,
        website: brewObj.website
    });
    const [errors, setErrors]= useState([])

    const handleChange = (e) => {
        setBrewery({
            ...brewery,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([brewery.name, brewery.address, brewery.website].some(val => val.trim() === "")) {
            alert("You must fill in all the information please!")
        }

       fetch(`api/breweries/${brewObj.id}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({name: brewery.name, address: brewery.address, phone: brewery.phone, website: brewery.website})
       })
       .then((resp) => {
            if (resp.status === 201) {
                resp.json()
                .then(data => handleUpdate(data))
            } else {
                resp.json()
                .then(errorObj => setErrors(errorObj.errors))
            }
        })
        .catch(error => setErrors(error.errors))  
        
    }
    return (
        <>
            <h3>Edit Post</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} type="text" name="name" value={brewery.name} required/><br />
                <label htmlFor="phone">Phone</label>
                <input onChange={handleChange} type="text" name="phone" value={brewery.phone}/><br />
                <label htmlFor="website">website</label>
                <input onChange={handleChange} type="text" name="website" value={brewery.website} required/><br />
                <label htmlFor="address">Address</label>
                <input onChange={handleChange} type="text" name="address" value={brewery.address} required/><br />
                <input type="submit" value="Update Post" />
            </form>
            <div></div>

        </>
    )
}

export default EditBreweryForm