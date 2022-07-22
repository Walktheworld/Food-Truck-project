import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const PostCard = ({post}) => {
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
            <div>Where:{finalPost.location} When:{finalPost.date}</div>
            <hr/>
        </div>
    </div>
  )
}

export default PostCard