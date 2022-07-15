import styled from "styled-components";
const Home= () => {
    return (
        <Mainpage>
            <h3>
                With each passing day, food trucks have become more and more popular.
                <br/>
                So we have created a spot for nothing but your favorite food trucks. 
                <br/>
                Please leave a review for your favorites! We will see you there!
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