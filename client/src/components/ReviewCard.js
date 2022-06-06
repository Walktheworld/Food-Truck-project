import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const ReviewCard = ({review}) => {
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
        <p>{finalReview.post} Review by:{finalReview.user_id}</p>
    </div>
  )
}

export default ReviewCard