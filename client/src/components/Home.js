import styled from "styled-components";
const Home= () => {
    return (
        <Mainpage>
            <h3>
                Please join us in building the most extensive brewery database in the world. 
            </h3>
            <h3>
                Add breweries to the community and leave a review for your favorites! Belch It to the world!
            </h3>
        </Mainpage>
    )
}

export default Home;

const Mainpage = styled.article`
margin: auto;
text-align: center;
max-width: auto;
margin: 40px auto;
`;