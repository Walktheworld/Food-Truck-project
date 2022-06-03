import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const ReviewCard = ({review}) => {
    const {id} = useParams()
    const [reviewObj, setReviewObj] = useState(null);
    useEffect(() => {   
        if (!review) {
            fetch(`/reviews/${id}`)
            .then(resp => resp.json())
            .then(review => setReviewObj(review))
        }
    }, [review, id]);

    const finalReview = review ? review : reviewObj
    if (!finalReview) return <h1>Loading...</h1>
  return (
    <div>
        <h4>{finalReview.post}</h4>
    </div>
  )
}

export default ReviewCard