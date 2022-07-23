import {useState, useEffect, useContext} from "react"
import {useHistory, useLocation, useParams} from "react-router-dom"
import { UserContext } from "../context/user";

const PostCard = ({post}) => {
    const {postId} = useParams()
    const [postObj, setPostObj] = useState([]);
    const location = useLocation()  
    const history = useHistory()
    const { user } = useContext(UserContext);
    useEffect(() => {   
        if (!post) {
            fetch(`/api/posts/${postId}}`)
            .then(resp => resp.json())
            .then(post => setPostObj(post))
        }
    }, [post, postId]);

    const handleDelete = () => { 
        fetch(`/api/posts/${finalPost.id}`,{
            method: "DELETE",
        }).then((r)=> {
            if (r.ok) {
                history.push('/pages')
            }else{
                r.json().then((error) => alert(error.errors))
            }  
        })
        .catch((error)=> alert(error.errors))
    }
    

    const finalPost = post ? post : postObj
    if (!finalPost) return <h1>Loading...</h1>
  return (
    <div>
        <div key={finalPost.id}>
            <div>{finalPost.content}</div>
            <div>Where:{finalPost.location} When:{finalPost.date}</div>
            {location.pathname !== "/pages" && finalPost?.user_id=== user.id ? (<>
                <button name="delete" id="delete-btn" onClick={handleDelete}>Delete</button>
            </>) : null }
            <hr/>
        </div>
    </div>
  )
}

export default PostCard