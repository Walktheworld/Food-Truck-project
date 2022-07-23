import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const ReviewCard = ({review}) => {
    const {reviewId} = useParams()
    const [reviewObj, setReviewObj] = useState([]);
    useEffect(() => {   
        if (!review) {
            fetch(`/api/reviews/${reviewId}`)
            .then(resp => resp.json())
            .then(review => setReviewObj(review))
        }
    }, [review, reviewId]);

    const finalReview = review ? review : reviewObj
    if (!finalReview) return <h1>Loading...</h1>
    console.log(finalReview)
  return (
    <div>
        <hr />
        {finalReview.comment} 
        <br/>
        <div> review by: {finalReview.review_by}</div>
        <hr />
          
    </div>
  )
}

export default ReviewCard




