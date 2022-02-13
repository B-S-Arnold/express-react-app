// import User from "../../../backend/db/models/user";
import { csrfFetch } from "./csrf";

const ADD = 'reviews/ADD'
const LOAD = 'reviews/LOAD'
const EDIT = 'reviews/EDIT'
const DEL = 'reviews/DEL'

const loadReview = list => ({
    type: LOAD,
    payload: list
});

const addReview = review => ({
    type: ADD,
    payload: review

});

const edit = review => ({
    type: EDIT,
    payload: review
})

const delReview = review => ({
    type: DEL,
    payload: review
})

// const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//         username,
//         email,
//         password,
//     }),

// });



//CREATE 
export const createReview = (review) => async (dispatch, getState) => {

    const response = await csrfFetch(`/api/spots/${review.spotId}`, {
        method: 'POST',
        body: JSON.stringify(review)
    })

    let newReview;
    if (response.ok) {


        const newReview = await response.json();
        dispatch(addReview(newReview))

    }

    return newReview;
}
//READ

export const getReview = () => async dispatch => {

    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const list = await response.json();

        console.log(list)
        dispatch(loadReview(list));
    }
    return response;
};


export const deleteReview = (review) => async (dispatch, getState) => {

    console.log("review IN DEL review!", review)
    console.log("review id IN DEL review!", review.id)

    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE',

    })
    console.log(response)

    let oldreview;
    if (response.ok) {


        const oldreview = await response.json();
        dispatch(delReview(oldreview))

    }

    return oldreview;
}

//UPDATE
export const editReview = (payload) => async (dispatch, getState) => {

    const response = await csrfFetch(`/api/reviews/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log('EDIT PAYLOAD', payload)
    console.log('EDIT RESPONSE', response)

    let newreview;
    if (response.ok) {
        newreview = await response.json()
        console.log("NEWWW reviewTT!!!!", newreview)
        dispatch(edit(newreview))
    }
    return newreview;
}



///review REDUCER

const initialState = { review: null };

const reviewReducer = (state = initialState, action) => {
    // if (!state[action.review]) {
    //     let newState = {
    //         ...state,
    //         [action.review]: action.review
    //     };
    let newState
    switch (action.type) {
        case ADD:
            newState = Object.assign({}, state);
            newState = action.payload;
            // console.log("NEWSTATE!!!!!!", newState)
            return newState;

        case LOAD:
            const allreviews = {};
            action.payload.reviews.forEach(review => {
                allreviews[review.id] = review;
                // console.log("review", review)
                // console.log("All reviewS!!!!", allreviews)
            });
            return {

                ...allreviews,
                // ...state,
            };
        case DEL:

            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload].reviews.filter(
                        (reviewId) => reviewId !== action.id
                    )
                }

            };

        default:
            return state;

    }

}


export default reviewReducer;