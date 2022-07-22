import {useState, useEffect} from 'react'
import PageList from "../components/PageList"

const PagesConatainer = () => {
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
console.log(pages)

    
    if (loading) return <h1>...Loading...</h1>
  return (
    <div>
        <PageList pages={pages}   />
    </div>
  )
}

export default PagesConatainer