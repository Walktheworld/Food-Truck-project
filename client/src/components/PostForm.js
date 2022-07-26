
import {useState} from "react"
import styled from "styled-components";
import { Button, FormField, Input, Label } from "../styles";
import {useHistory} from "react-router-dom"


const PostForm = ({pageId, addNewPost}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({
        content: "",
        location: "",
        date: "",
    });
    const history = useHistory()

  
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([post.content].some(val => val.trim() === "")) {
            alert("You must fill in all the information please!")
        }

        fetch(`/api/pages/${pageId}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(resp => {                   
          setIsLoading(false);
            if (resp.status === 201) {
                resp.json()
                .then(post => {
                    addNewPost(post)
                    setPost({
                        content: post.content,
                        location: post.location,
                        date: post.date
                    })
                    history.push(`/pages`);


                })
            } else {
                resp.json()
                .then(errorObj => {
                    alert(errorObj.errors)
                    
                })
            }
        })
        .catch(err => alert(err))
        
    }
    return (
      <Wrapper>
        <WrapperChild>

          <form onSubmit={handleSubmit}>
            <FormField>
              <Label htmlFor="content">Leave a post</Label>
              <Input
                type="text"
                name="content"
                value={post.content}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                name="location"
                value={post.location}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <Label htmlFor="date">Date</Label>
              <Input
                type="text"
                name="date"
                value={post.date}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
                <Button color="primary" type="submit">
                    {isLoading ? "Loading..." : "Submit post"}
                </Button>
            </FormField>
          </form> 
        </WrapperChild>
      </Wrapper>

    )
}

  const Wrapper = styled.section`
    max-width: 1000px;
    margin: 40px auto;
    padding: 16px;
    display: flex;
    gap: 24px;
  `;
  
  const WrapperChild = styled.div`
    flex: 1;
  `;

export default PostForm