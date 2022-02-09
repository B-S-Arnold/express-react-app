import { csrfFetch } from "./csrf";

const ADD = '/spots/add'

const addSpot = spot => ({
    type: ADD,
    payload: spot
    
});




export const createSpot = (spot) => async (dispatch, getState) => {
    const {userId, address, city, state, country, name, description, price } = spot
    const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userId, address, city, state, country, name, description, price)
    })
    console.log("PAYLOAD!!!", spot)
    console.log("RESPONSE!!!!", response)
    
    
    let data;
    if (response.ok) {
        
        
        const data = await response.json();
        dispatch(addSpot(data.spot))
        console.log("DATA!!!", data)
    }
    return data;
}


// export const signup = (user) => async (dispatch) => {
//     const { username, email, password } = user;
//     const response = await csrfFetch("/api/users", {
//         method: "POST",
//         body: JSON.stringify({
//             username,
//             email,
//             password,
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// };