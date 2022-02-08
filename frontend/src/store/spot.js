
const ADD = 'spots/ADD_ONE'

const addSpot = spot => ({
    type: ADD,
    spot
});



export const createSpot = (payload) => async (dispatch, getState) => {
    const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log(payload)
    console.log("RESPONSE!!!", response)
    let data;
    if (response.ok) {
        
        console.log(data)
        const data = await response.json();
        dispatch(addSpot(data.spot))
        console.log(data)
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