// import { useState } from "react";
// import { useHistory } from "react-router";
// import styled from "styled-components";
// import { Button, Error, FormField, Input, Label } from "../styles";


// function ReviewForm() {
//     const [post, setPost] = useState("No Reviews");
//     const [errors, setErrors] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const history = useHistory();
  
//     function handleSubmit(e) {
//       e.preventDefault();
//       setIsLoading(true);
//       fetch("/reviews", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           post,
//         }),
//       }).then((r) => {
//         setIsLoading(false);
//         if (r.ok) {
//           history.push("/");
//         } else {
//           r.json().then((err) => setErrors(err.errors));
//         }
//       });
//     }
  
//     return (
      // <Wrapper>
      //   <WrapperChild>
      //     <form onSubmit={handleSubmit}>
      //       <FormField>
      //         <Label htmlFor="post">Leave a review</Label>
      //         <Input
      //           type="text"
      //           id="post"
      //           value={post}
      //           onChange={(e) => setPost(e.target.value)}
      //         />
      //       </FormField>
      //       <FormField>
      //           <Button color="primary" type="submit">
      //               {isLoading ? "Loading..." : "Submit Review"}
      //           </Button>
      //       </FormField>
      //       <FormField>
      //        {errors.map((err) => (
      //         <Error key={err}>{err}</Error>
      //        ))}
      //       </FormField>
      //      </form> 
      //   </WrapperChild>
      // </Wrapper>
//     );
//   }
  
//   const Wrapper = styled.section`
//     max-width: 1000px;
//     margin: 40px auto;
//     padding: 16px;
//     display: flex;
//     gap: 24px;
//   `;
  
//   const WrapperChild = styled.div`
//     flex: 1;
//   `;
  
//   export default ReviewForm;
import {useState} from "react"
import styled from "styled-components";
import { Button, FormField, Input, Label } from "../styles";

const ReviewForm = ({breweryId, addNewReview}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [review, setReviews] = useState({
        post: "",
    });

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
                    // setIsLoading(false);


                })
            } else {
                resp.json()
                .then(errorObj => {
                    alert(errorObj.error)
                    
                })
            }
        })
        // .then
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

        // <>
        //     <h3>Create a new review</h3>
            
        //     <form onSubmit={handleSubmit}>
        //         <label htmlFor="post">Content</label>
        //         <input onChange={handleChange} type="text" name="post" value={review.post} required/><br />
        //         <input type="submit" value="Create Comment" />
        //     </form>
        // </>
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