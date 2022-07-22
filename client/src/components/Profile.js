import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../context/user';


const Profile = () => {
    const [reviewedPages, setReviewedPages] = useState("");
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext)
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const resp = await fetch("/api/profile")
                const data = await resp.json()
                setReviewedPages(data)
                setLoading(false)
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, []);


    
    if (loading) return <h1>...Loading...</h1>
  return (
      <div>
        <h2>{user.username}'s Profile</h2>
        <h4>{user.email}</h4>
        <div>Reviewed trucks:{reviewedPages ? reviewedPages.map((data, i) => {
          return <div>{data.name}</div>
        }) : null}</div>
      </div>

  )
}

export default Profile