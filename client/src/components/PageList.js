import PageCard from "./BreweryCard"
import styled from "styled-components";


const PageList = ({pages, user}) => {
  const renderPages = pages?.map(page => <PageCard key={page.id} page={page} user={user} />)
  return (
    <Wrapper>{renderPages}</Wrapper>
  )
}  
const Wrapper = styled.section`
  display: grid ;
  grid-template-columns: auto auto;
  grid-gap: .5rem;
`;
  export default PageList

