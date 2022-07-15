import ReviewCard from "./ReviewCard"
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"

const ReviewsList = ({reviews, handleError}) => {
    const {pageId} = useParams()
    const [reviewsList, setReviewList] = useState([])
    
    useEffect(() => {
        if (!reviews) {
            fetch(`/api/pages/${pageId}/reviews`)
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
    }, [pageId, reviews, handleError])


    const finalReviewsList = reviews ? reviews : reviewsList
    const renderReviews = finalReviewsList?.map(review => <ReviewCard key={review.id} review={review}/>)

    return (
        <div>{renderReviews}</div>
    )
}

export default ReviewsList
