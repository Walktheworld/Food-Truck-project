
import {useState} from "react"
import styled from "styled-components";
import { Button, FormField, Input, Label } from "../styles";
import {useHistory} from "react-router-dom"


const ReviewForm = ({breweryId, addNewReview}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [review, setReviews] = useState({
        post: "",
    });
    const history = useHistory()

  
    const handleChange = (e) => {
        setReviews({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([review.post].some(val => val.trim() === "")) {
            alert("You must fill in all the information please!")
        }

        fetch(`/api/breweries/${breweryId}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
        .then(resp => {                   
          setIsLoading(false);
            if (resp.status === 201) {
                resp.json()
                .then(review => {
                    addNewReview(review)
                    setReviews({post: review.post})
                    history.push(`/breweries/${breweryId}`);


                })
            } else {
                resp.json()
                .then(errorObj => {
                    alert(errorObj.error)
                    
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
              <Label htmlFor="post">Leave a review</Label>
              <Input
                type="text"
                name="post"
                value={review.post}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
                <Button color="primary" type="submit">
                    {isLoading ? "Loading..." : "Submit Review"}
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

export default ReviewForm