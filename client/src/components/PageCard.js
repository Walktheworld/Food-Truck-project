import {useState, useEffect} from "react"
import { useParams, useLocation, Link, useHistory } from "react-router-dom"
import styled from "styled-components";
import { Box, Button } from "../styles";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import EditPageForm from "./EditPageForm";
import PostForm from "./PostForm";
import PostList from "./PostList";

const PageCard= ({page, user}) => {
    const {pageId} = useParams()
    const [reviews, setReviews] = useState([]);
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [pageObj, setPageObj] = useState(null);
    const location = useLocation()    
    const [users, setUsers] = useState([]);
    const history = useHistory()
    
    useEffect(() => {   
        if (!page) {
            fetch(`/api/pages/${pageId}`)
            .then(resp => resp.json())
            .then(page => {
              setPageObj(page)
              setReviews(page.reviews)
              setPosts(page.posts)
            })
        }
    }, [page, pageId]);

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

    const addNewPost = (postObj) => {
      setReviews(currentPosts => [postObj, ...currentPosts])
  }

    const handleUpdate = (updatedPageObj) => {
        setEditMode(false)
        setPageObj(updatedPageObj)
      }
    
    const handleClick = (e) => { 
        if (e.target.name === "delete") {
          fetch(`/api/pages/${finalPage.id}`, {    method: "DELETE"
          })
          .then(() => history.push('/pages'))
        } else {
            setEditMode(true)
        }
    }
    const finalPage = page ? page : pageObj
    console.log(finalPage)

    if (!finalPage) return <h1>Loading...</h1>
    return (
        <Wrapper>
             <Page key={finalPage.id}>
            {!editMode ?<> 
                        <Box>
                            <hr />
                            <h2 ><Link to={`/pages/${finalPage.id}`}>{finalPage.name}</Link></h2>
                            <p>
                            <em> {finalPage.website} </em>
                            <br/>
                            &nbsp;·&nbsp;
                            <em> {finalPage.address} </em>
                            &nbsp;·&nbsp;
                            <br/>
                            <em>Phone #: {finalPage.phone} </em>
                            <br/> 
                            {location.pathname === "/pages" ? (<em>Reviewed by {finalPage.reviewers?.length || 0} users </em>) : null }                              
                            </p>
                            <hr />
                            {location.pathname !== "/pages" && finalPage?.user_id === user.id ? (<>
                              <PostForm addNewPost={addNewPost} pageId={finalPage.id} />
                            </>) : null }
                            <PostList posts={finalPage.posts}/>
                            {/* {location.pathname === "/pages" ? ( <PostList posts={finalPage.posts}/>) : null } */}
                        </Box>
            </> : <EditPageForm pageObj={finalPage} handleUpdate={handleUpdate}/>}
            {location.pathname !== "/pages" ? (<>
                <ReviewForm addNewReview={addNewReview} pageId={finalPage.id} />
            <hr />
            {finalPage.reviews.map((review) => <ReviewCard key={review.id} review={review} reviews={reviews} users={users}/>)} 
            <hr />
            </>) : null }
            {location.pathname !== "/pages/:id" && finalPage?.user_id === user.id ? <>
                <Button name="edit-mode" id="edit-btn" onClick={handleClick}>Edit</Button>
                &nbsp; &nbsp;
                <Button name="delete" id="delete-btn" onClick={handleClick}>Delete</Button>
            </> : null}
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