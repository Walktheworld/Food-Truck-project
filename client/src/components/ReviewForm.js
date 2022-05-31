import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label } from "../styles";


function ReviewForm() {
    const [post, setPost] = useState("No Reviews");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
  
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post,
        }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          history.push("/");
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  
    return (
      <Wrapper>
        <WrapperChild>
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label htmlFor="post">Leave a review</Label>
              <Input
                type="text"
                id="post"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </FormField>
            <FormField>
                <Button color="primary" type="submit">
                    {isLoading ? "Loading..." : "Submit Review"}
                </Button>
            </FormField>
            <FormField>
             {errors.map((err) => (
              <Error key={err}>{err}</Error>
             ))}
            </FormField>
           </form> 
        </WrapperChild>
      </Wrapper>
    );
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
  
  export default ReviewForm;
  