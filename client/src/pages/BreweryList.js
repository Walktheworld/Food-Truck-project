import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function BreweryList() {
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    fetch("/api/breweries")
      .then((r) => r.json())
      .then(setBreweries);
  }, []);

  return (
    <Wrapper>
      {breweries.length > 0 ? (
        breweries.map((brewery) => (
          <Recipe key={brewery.id}>
            <Box>
              <h2>{brewery.name}</h2>
              <p>
                <em>Phone Number: {brewery.phone} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {brewery.user.username}</cite>
              </p>
              <ReactMarkdown>{brewery.instructions}</ReactMarkdown>
            </Box>
          </Recipe>
        ))
      ) : (
        <>
          <h2>No Breweries Found</h2>
          <Button as={Link} to="/new">
            Add a New Brewery
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default BreweryList;
