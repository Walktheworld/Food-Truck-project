import {useState, useEffect} from 'react'
import PostList from '../components/PostList';

const PostsContainer = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const resp = await fetch("/api/posts")
                const data = await resp.json()
                setPosts(data)
                setLoading(false)
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, []);


    
    if (loading) return <h1>...Loading...</h1>
  return (
    <div>
        <PostList posts={posts}  />
    </div>
  )
}

export default PostsContainer