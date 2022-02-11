// import User from "../../../backend/db/models/user";
import { csrfFetch } from "./csrf";

const ADD = 'spots/ADD'
const LOAD = 'spots/LOAD'
const EDIT = 'spots/EDIT'
const DEL = 'spots/DEL'

const loadSpot = list => ({
    type: LOAD,
    payload: list
});

const addSpot = spot => ({
    type: ADD,
    payload: spot
    
});

const editSpot = spot => ({
    type: EDIT,
    payload: spot
})

const delSpot = spot => ({
    type: DEL,
    payload: spot
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
export const createSpot = (spot) => async (dispatch, getState) => {

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })
   
    let newSpot;
    if (response.ok) {
        
        
        const newSpot = await response.json();
        dispatch(addSpot(newSpot))
        
    }
    
    return newSpot;
}
//READ

export const getSpot = () => async dispatch => {
    
    const response = await csrfFetch(`/api/users`);

    if (response.ok) {
        const list = await response.json();
        
        console.log(list)
        dispatch(loadSpot(list));
    }
    return response;
};

export const getSpotPage = () => async dispatch => {
    
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const list = await response.json();
        
        console.log(list)
        dispatch(loadSpot(list));
    }
    return response;
};

//UPDATE
export const editSpots = (payload) => async (dispatch, getState) => {
    const response = await fetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    })
    console.log('EDIT PAYLOAD', payload)
    console.log('EDIT RESPONSE', response)

    let newSpot;
    if (response.ok) {
        newSpot = await response.json()
        console.log(newSpot)
        dispatch(addSpot(newSpot))
    }
    return newSpot;
}



///SPOT REDUCER

const initialState = { spot: null };

const spotReducer = (state = initialState, action) => {
    // if (!state[action.spot]) {
    //     let newState = {
    //         ...state,
    //         [action.spot]: action.spot
    //     };
    let newState
    switch (action.type) {
        case ADD:
            newState = Object.assign({}, state);
            newState = action.payload;
            // console.log("NEWSTATE!!!!!!", newState)
            return newState;

        case LOAD:
            const allSpots = {};
            action.payload.spots.forEach(spot => {
                allSpots[spot.id] = spot;
                // console.log("SPOT", spot)
                // console.log("All SPOTS!!!!", allSpots)
            });
            return {
                
                ...allSpots,
                ...state,
            };
        // case DEL:
        //     return {
        //         ...state,
        //         [action.spotId]: {
        //             ...state[action.spotId],
        //         }
        //     };

        default:
            return state;
        
    }
    
}


export default spotReducer;


