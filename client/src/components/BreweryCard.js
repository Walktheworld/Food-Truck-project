import {useState, useEffect} from "react"
import { useParams, useLocation, Link, useHistory } from "react-router-dom"
import styled from "styled-components";
import { Box, Button } from "../styles";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import EditBreweryForm from "./EditBreweryForm";
const BreweryCard= ({brewery, user}) => {
    const {id} = useParams()
    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [brewObj, setBrewObj] = useState(null);
    const location = useLocation()    
    const [users, setUsers] = useState([]);
    const history = useHistory()
    
    useEffect(() => {   
        if (!brewery) {
            fetch(`/api/breweries/${id}`)
            .then(resp => resp.json())
            .then(brewery => {
              setBrewObj(brewery)
              setReviews(brewery.reviews)
            })
        }
    }, [brewery, id]);

    useEffect(() => {   
          fetch(`/api/users`)
          .then(resp => resp.json())
          .then(user => {
            setUsers(user)
          })
    }, []);

    const addNewReview = (reviewObj) => {
        setReviews(currentReviews => [reviewObj, ...currentReviews])
    }

    const handleUpdate = (updatedBrewObj) => {
        setEditMode(false)
        setBrewObj(updatedBrewObj)
      }
    
    const handleClick = (e) => { 
        if (e.target.name === "delete") {
          fetch(`/api/breweries/${finalBrewery.id}`, {    method: "DELETE"
          })
          .then(() => history.push('/breweries'))
        } else {
            setEditMode(true)
        }
    }
    const finalBrewery = brewery ? brewery : brewObj

    if (!finalBrewery) return <h1>Loading...</h1>
    return (
        <Wrapper>
             <Brewery key={finalBrewery.id}>
            {!editMode ?<> 
                        <Box>
                            <h2 ><Link to={`/breweries/${finalBrewery.id}`}>{finalBrewery.name}</Link></h2>
                            <p>
                            <em> {finalBrewery.website} </em>
                            <br/>
                            &nbsp;·&nbsp;
                            <em> {finalBrewery.address} </em>
                            &nbsp;·&nbsp;
                            <br/>
                            <em>Phone #: {finalBrewery.phone} </em>
                            <br/>                            
                            <em>Reviewed by {finalBrewery.reviewers?.length || 0} users </em>
                            </p>

  
                        </Box>
            {location.pathname !== "/breweries/:id" && finalBrewery?.user_id === user.id ? <>
                <Button name="edit-mode" id="edit-btn" onClick={handleClick}>Edit</Button>
                &nbsp; &nbsp;
                <Button name="delete" id="delete-btn" onClick={handleClick}>Delete</Button>
            </> : null}
            </> : <EditBreweryForm brewObj={finalBrewery} handleUpdate={handleUpdate}/>}
            <hr />
            {finalBrewery.reviews.map((review) => <ReviewCard key={review.id} review={review} revies={reviews} users={users}/>)} 
            <hr />
            {location.pathname !== "/breweries" ? (<>
                <ReviewForm addNewReview={addNewReview} breweryId={finalBrewery.id} />
            <hr />
            <hr />
            </>) : null }
            </Brewery>
        </Wrapper>
    )
}
  const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
  `;
  
  const Brewery = styled.article`
    margin-bottom: 24px;
    text-align: center;

  `;
export default BreweryCard;