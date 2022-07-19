
import styled from "styled-components";
import PostCard from "./PostCard";


const PostList = ({posts, user}) => {
  const renderPosts = posts?.map(post => <PostCard key={post.id} post={post} user={user} />)
  return (
    <Wrapper>{renderPosts}</Wrapper>
  )
}  
const Wrapper = styled.section`
  display: grid ;
  grid-template-columns: auto auto;
  grid-gap: .5rem;
`;
  export default PostList
