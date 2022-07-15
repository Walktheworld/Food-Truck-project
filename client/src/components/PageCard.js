import {useState, useEffect} from "react"
import { useParams, useLocation, Link, useHistory } from "react-router-dom"
import styled from "styled-components";
import { Box, Button } from "../styles";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import EditBreweryForm from "./EditBreweryForm";
const PageCard= ({page, user}) => {
    const {id} = useParams()
    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [pageObj, setPageObj] = useState(null);
    const location = useLocation()    
    const [users, setUsers] = useState([]);
    const history = useHistory()
    
    useEffect(() => {   
        if (!page) {
            fetch(`/api/pages/${id}`)
            .then(resp => resp.json())
            .then(page => {
              setPageObj(page)
              setReviews(page.reviews)
            })
        }
    }, [page, id]);

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

    const handleUpdate = (updatedPageObj) => {
        setEditMode(false)
        setPageObj(updatedPageObj)
      }
    
    const handleClick = (e) => { 
        if (e.target.name === "delete") {
          fetch(`/api/pages/${fianlPage.id}`, {    method: "DELETE"
          })
          .then(() => history.push('/pages'))
        } else {
            setEditMode(true)
        }
    }
    const fianlPage = page ? page : pageObj

    if (!fianlPage) return <h1>Loading...</h1>
    return (
        <Wrapper>
             <Page key={fianlPage.id}>
            {!editMode ?<> 
                        <Box>
                            <h2 ><Link to={`/pages/${fianlPage.id}`}>{fianlPage.name}</Link></h2>
                            <p>
                            <em> {fianlPage.website} </em>
                            <br/>
                            &nbsp;·&nbsp;
                            <em> {fianlPage.address} </em>
                            &nbsp;·&nbsp;
                            <br/>
                            <em>Phone #: {fianlPage.phone} </em>
                            <br/>                            
                            <em>Reviewed by {fianlPage.reviewers?.length || 0} users </em>
                            </p>

  
                        </Box>
            {location.pathname !== "/pages/:id" && fianlPage?.user_id === user.id ? <>
                <Button name="edit-mode" id="edit-btn" onClick={handleClick}>Edit</Button>
                &nbsp; &nbsp;
                <Button name="delete" id="delete-btn" onClick={handleClick}>Delete</Button>
            </> : null}
            </> : <EditBreweryForm pageObj={fianlPage} handleUpdate={handleUpdate}/>}
            <hr />
            {fianlPage.reviews.map((review) => <ReviewCard key={review.id} review={review} reviews={reviews} users={users}/>)} 
            <hr />
            {location.pathname !== "/pages" ? (<>
                <ReviewForm addNewReview={addNewReview} pageId={fianlPage.id} />
            <hr />
            <hr />
            </>) : null }
            </Page>
        </Wrapper>
    )
}
  const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
  `;
  
  const Page = styled.article`
    margin-bottom: 24px;
    text-align: center;

  `;
export default PageCard;