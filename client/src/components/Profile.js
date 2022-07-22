import {useState, useEffect} from 'react'


const Profile = () => {
    const [reviewedPages, setReviewedPages] = useState("");
    const [loading, setLoading] = useState(true);
    
    
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
      <div>{reviewedPages ? reviewedPages.map((data, i) => {
          return <div>{data.name}</div>
      }) : null}</div>

  )
}

export default Profile