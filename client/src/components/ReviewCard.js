import {useState, useEffect, useContext} from "react"
import {useParams} from "react-router-dom"
import { UserContext } from "../context/user";

const ReviewCard = ({review}) => {
    const {id} = useParams()
    const [reviewObj, setReviewObj] = useState([]);
    const { user } = useContext(UserContext);
    useEffect(() => {   
        if (!review) {
            fetch(`/api/reviews/${id}`)
            .then(resp => resp.json())
            .then(review => setReviewObj(review))
        }
    }, [review, id]);

    const finalReview = review ? review : reviewObj
    if (!finalReview) return <h1>Loading...</h1>
    console.log(finalReview)
  return (
    <div>
        <hr />
        {finalReview.comment} 
        <br/>
        <h1> review by: {finalReview.user_id}</h1>
          {/* Review by:{users? users.map((data, i) => {
            if (data.id === review.user_id)
              return <div key={i}>{data.username}</div>
          }):null} */}

          {/* Review by:{user? user.map((data, i) => {
            if (data.id === review.user_id)
              return <div key={i}>{data.username}</div>
          }):null} */}
          <hr />
          
    </div>
  )
}

export default ReviewCard




