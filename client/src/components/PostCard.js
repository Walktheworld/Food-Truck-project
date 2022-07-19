import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const PostCard = ({post, users}) => {
    const {id} = useParams()
    const [postObj, setPostObj] = useState([]);
    useEffect(() => {   
        if (!post) {
            fetch(`/api/posts/${id}`)
            .then(resp => resp.json())
            .then(post => setPostObj(post))
        }
    }, [post, id]);

    const finalPost = post ? post : postObj
    if (!finalPost) return <h1>Loading...</h1>
  return (
    <div>
        <div>{finalPost.content}</div>
    </div>
  )
}

export default PostCard