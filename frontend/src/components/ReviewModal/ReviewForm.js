import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/review"
import { useNavigate, useParams } from "react-router-dom";
import './ReviewForm.css'



function ReviewForm() {


    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const { spotId } = useParams();
    const navigate = useNavigate()

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
        // setErrors([]);
        return dispatch(reviewActions.createReview(payload))
            .then(() => {
                window.location.reload();
            },
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }

            );
    };

    return (
        <form onSubmit={handleSubmit} className='revform'>
            {errors?.length ?
                < ul >
                    {
                        errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))
                    }
                </ul> : <></>}

            <textarea
                className="revin"
                type="text"
                placeholder="Add a review..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <button className="subbtn" type="submit">Submit</button>

        </form>
    );
}

export default ReviewForm;