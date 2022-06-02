import BreweryCard from "./BreweryCard"

const BreweryList = ({breweries}) => {
  const renderBreweries = breweries.map(brewery => <BreweryCard key={brewery.id} brewery={brewery}/>)
  return (
    <div>{renderBreweries}</div>
  )
}
  export default BreweryList

