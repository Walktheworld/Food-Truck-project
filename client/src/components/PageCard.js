import {useState, useEffect, useContext} from "react"
import { useParams, useLocation, Link, useHistory } from "react-router-dom"
import styled from "styled-components";
import { Box, Button } from "../styles";
import ReviewForm from "./ReviewForm";
import EditPageForm from "./EditPageForm";
import PostForm from "./PostForm";
import { UserContext } from "../context/user";
import PostCard from "./PostCard";
import ReviewsList from "./ReviewsList";

const PageCard= ({page}) => {
    const {pageId} = useParams()
    const [reviews, setReviews] = useState([]);
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [pageObj, setPageObj] = useState(null);
    const location = useLocation()    
    const history = useHistory()
    const { user } = useContext(UserContext);
    
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
                            {location.pathname !== "/pages" && finalPage?.user.id === user.id ? (<>
                              <PostForm addNewPost={addNewPost} pageId={finalPage.id} />
                            </>) : null }
                            {location.pathname !== "/pages" ? (<>{finalPage.newest_post.map((post) => <PostCard key={post.id} post={post} posts={posts}/>)}</>) : null }
                        </Box>
            </> : <EditPageForm pageObj={finalPage} handleUpdate={handleUpdate}/>}

            {location.pathname !== "/pages" ? (<>
                <ReviewForm addNewReview={addNewReview} pageId={finalPage.id} />
                <ReviewsList key={reviews.id}/>
            </>) : null }
            {location.pathname !== "/pages" && finalPage?.user.id === user.id ? <>
                <Button name="edit-mode" id="edit-btn" onClick={handleClick}>Edit Food Truck</Button>
                &nbsp; &nbsp;
                <Button name="delete" id="delete-btn" onClick={handleClick}>Delete Food Truck</Button>
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