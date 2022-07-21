import PostCard from "./PostCard"
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"

const PostList = ({posts, handleError}) => {
    const {pageId} = useParams()
    const [postsList, setPostsList] = useState([])
    
    useEffect(() => {
        if (!posts) {
            fetch(`/api/pages/${pageId}/posts`)
            .then(resp => {
                if (resp.status === 200) {
                    resp.json()
                    .then(posts => setPostsList(posts))
                } else {
                    resp.json()
                    .then(errorObj => handleError(errorObj.error))
                }
            })
            .catch(error => handleError(error))
        }
    }, [pageId, posts, handleError])


    const finalPostsList = posts ? posts : postsList
    const renderPosts = finalPostsList?.map(post => <PostCard key={post.id} post={post}/>)
    return (
        <div>{renderPosts}</div>
    )
}

export default PostList
// import styled from "styled-components";
// import PostCard from "./PostCard";


// const PostList = ({posts, user}) => {
//   const renderPosts = posts?.map(post => <PostCard key={post.id} post={post} user={user} />)
//   return (
//     <Wrapper>{renderPosts}</Wrapper>
//   )
// }  
// const Wrapper = styled.section`
//   display: grid ;
//   grid-template-columns: auto auto;
//   grid-gap: .5rem;
// `;
//   export default PostList
