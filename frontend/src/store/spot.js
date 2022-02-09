import { csrfFetch } from "./csrf";

const ADD = 'spots/add'

const addSpot = spot => ({
    type: ADD,
    payload: spot
    
});




export const createSpot = (spot) => async (dispatch, getState) => {
    const {userId, address, city, state, country, name, description, price } = spot

    // use FETCH for CONSOLE LOGS

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userId, address, city, state, country, name, description, price)
    })
    console.log("PAYLOAD!!!", spot)
    console.log("RESPONSE!!!!", response)
    
    
    let newSpot;
    if (response.ok) {
        
        
        const newSpot = await response.json();
        dispatch(addSpot(newSpot))
        console.log("DATA!!!", newSpot)
    }
    
    return newSpot;
}
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
            newState.spot = action.payload;
            console.log(newState)
            return newState;
        default:
            return state;
    }
}


export default spotReducer;


