import {useState, useEffect} from 'react'
import PageList from "../components/PageList"

const PagesConatainer = ({user}) => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const resp = await fetch("/api/pages")
                const data = await resp.json()
                setPages(data)
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
        <PageList pages={pages} user={user}  />
    </div>
  )
}

export default PagesConatainer