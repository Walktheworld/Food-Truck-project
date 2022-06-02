import {useState, useEffect} from 'react'
import BreweryList from "../components/BreweryList"

const BreweriesConatainer = () => {
    const [breweries, setBreweries] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const resp = await fetch("/breweries")
                const data = await resp.json()
                setBreweries(data)
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
        <h2>Breweries</h2>
        <BreweryList breweries={breweries} />
    </div>
  )
}

export default BreweriesConatainer