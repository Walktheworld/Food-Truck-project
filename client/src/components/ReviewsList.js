import ReviewCard from "./ReviewCard"
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"

const ReviewsList = ({reviews, handleError}) => {
    const {breweryId} = useParams()
    const [reviewsList, setReviewList] = useState([])
    
    useEffect(() => {
        if (!reviews) {
            fetch(`/api/breweries/${breweryId}/reviews`)
            .then(resp => {
                if (resp.status === 200) {
                    resp.json()
                    .then(reviews => setReviewList(reviews))
                } else {
                    resp.json()
                    .then(errorObj => handleError(errorObj.error))
                }
            })
            .catch(error => handleError(error))
        }
    }, [breweryId, reviews, handleError])

    // if (!reviews) return <h2>The data you tried to access does not exist!</h2>
    const finalReviewsList = reviews ? reviews : reviewsList
    const renderReviews = finalReviewsList?.map(review => <ReviewCard key={review.id} review={review}/>)
    // console.log(reviews)
    return (
        <div>{renderReviews}</div>
    )
}

export default ReviewsList
// const ReviewsList = ({reviews}) => {
//     const renderReviews = reviews.map(review => <ReviewCard key={review.id} review={review}/>)
//     return (
//       <div>{renderReviews}</div>
//     )
//   }
//   export default ReviewsList