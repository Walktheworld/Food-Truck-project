import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const ReviewCard = ({review, users}) => {
    const {id} = useParams()
    const [reviewObj, setReviewObj] = useState([]);
    useEffect(() => {   
        if (!review) {
            fetch(`/api/reviews/${id}`)
            .then(resp => resp.json())
            .then(review => setReviewObj(review))
        }
    }, [review, id]);

    const finalReview = review ? review : reviewObj
    if (!finalReview) return <h1>Loading...</h1>
  return (
    <div>
        <div>{finalReview.post} 
        <br/>
        Review by:{users? users.map((data, i) => {
          if (data.id === review.user_id)
            return <div key={i}>{data.username}</div>
        }):null}</div>
    </div>
  )
}

export default ReviewCard