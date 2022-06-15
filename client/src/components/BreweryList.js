import BreweryCard from "./BreweryCard"
import styled from "styled-components";


const BreweryList = ({breweries, user}) => {
  const renderBreweries = breweries?.map(brewery => <BreweryCard key={brewery.id} brewery={brewery} user={user} />)
  return (
    <Wrapper>{renderBreweries}</Wrapper>
  )
}  
const Wrapper = styled.section`
  display: grid ;
  grid-template-columns: auto auto;
  grid-gap: .5rem;
`;
  export default BreweryList

