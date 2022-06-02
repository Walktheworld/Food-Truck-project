// import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Box, Button } from "../styles";
// import ReviewForm from "../components/ReviewForm";

// function BreweryCard({breweries}) {
//     return (
//       <Wrapper>
//         {breweries.length > 0 ? (
//           breweries.map((brewery) => (
//             <Recipe key={brewery.id}>
//               <Box>
//                 <h2>{brewery.name}</h2>
//                 <p>
//                   <em> {brewery.website} </em>
//                   <br/>
//                   <em>Phone Number: {brewery.phone} </em>
//                   &nbsp;·&nbsp;
//                   <cite>By {brewery.user.username}</cite>
//                   <button>Delete</button>
//                 </p>
//                 <ReactMarkdown>{brewery.review}</ReactMarkdown>
//                 <ReviewForm/>
//               </Box>
//             </Recipe>
//           ))
//         ) : (
//           <>
//             <h2>No Breweries Found</h2>
//             <Button as={Link} to="/new">
//               Add a New Brewery
//             </Button>
//           </>
//         )}
//       </Wrapper>
//     );
//   }
  
//   const Wrapper = styled.section`
//     max-width: 800px;
//     margin: 40px auto;
//   `;
  
//   const Recipe = styled.article`
//     margin-bottom: 24px;
//   `;
  
//   export default BreweryCard;

   
import {useState, useEffect} from "react"
import { useParams, useHistory} from "react-router-dom"
import Card from 'react-bootstrap/Card'

const BreweryCard= ({brewery}) => {

    const {id} = useParams()
    const history = useHistory()

    const [editMode, setEditMode] = useState(false);
    const [brewObj, setBrewObj] = useState(null);
    
    useEffect(() => {   
        if (!brewery) {
            fetch(`/breweries/${brewery.id}`)
            .then(resp => resp.json())
            .then(brewery => {
              setBrewObj(brewery)
            })
        }
    }, [brewery, id]);
    
    const handleClick = (e) => { 
        if (e.target.name === "delete") {
          fetch(`/breweries/${brewery.id}`, {    method: "DELETE"
          })
          .then(() => history.push("/"))
        } else {
            setEditMode(true)
        }
    }
    const finalPost = brewery ? brewery : brewObj
    if (!finalPost) return <h1>Loading...</h1>
    return (
        <div>
            {!editMode ? <>
            <Card className='brewery-card' style={{ width: 'auto' }}>
                <Card.Header>{brewery.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{brewery.ingredients}</Card.Title>
                    <Card.Text>{brewery.directions}</Card.Text>    
                    <button name="delete" id="delete-btn" onClick={handleClick}>Delete</button>
                </Card.Body>
                <Card.Footer className="text-muted">Created by: {brewery.user?.username || "N/A"}</Card.Footer>
            </Card>
            </>
            :null}
        </div>
    )
}

export default BreweryCard;