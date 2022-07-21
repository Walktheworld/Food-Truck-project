import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const PostCard = ({post, users}) => {
    const {postId} = useParams()
    const [postObj, setPostObj] = useState([]);
    useEffect(() => {   
        if (!post) {
            fetch(`/api/posts/${postId}}`)
            .then(resp => resp.json())
            .then(post => setPostObj(post))
        }
    }, [post, postId]);

    const finalPost = post ? post : postObj
    if (!finalPost) return <h1>Loading...</h1>
  return (
    <div>
        <div key={finalPost.id}>
            <div>{finalPost.content}</div>
        </div>
    </div>
  )
}

export default PostCard