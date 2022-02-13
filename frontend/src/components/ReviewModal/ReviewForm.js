import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/review"
import { useHistory, useParams } from "react-router-dom";



function ReviewForm() {

    
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const { spotId } = useParams();
    const history = useHistory();
    
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    let payload = {
        userId,
        spotId,
        content
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let path = `/users/${payload.userId}`
        console.log("PAYLOAD!!!!!!!!", payload)
        // setErrors([]);
        return dispatch(reviewActions.createReview(payload))
        .then( () => {
            window.location.reload();
        },
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
                
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Review
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </label>
            
            <button type="submit">Submit Review</button>
            
        </form>
    );
}

export default ReviewForm;