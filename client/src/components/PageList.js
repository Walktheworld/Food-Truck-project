import PageCard from "./PageCard"
import styled from "styled-components";


const PageList = ({pages}) => {
  const renderPages = pages?.map(page => <PageCard key={page.id} page={page} />)
  return (
    <Wrapper>{renderPages}</Wrapper>
  )
}  
const Wrapper = styled.section`
  display: grid ;
  grid-template-columns: auto auto auto;
  grid-gap: .5rem;
`;
  export default PageList

