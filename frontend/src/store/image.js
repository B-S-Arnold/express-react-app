import { csrfFetch } from "./csrf";

const ADD = 'images/ADD'
const LOAD = 'images/LOAD'
const DEL = 'images/DEL'

const loadImage = list => ({
    type: LOAD,
    payload: list
});

const addImage = image => ({
    type: ADD,
    payload: image

});

const delImage = image => ({
    type: DEL,
    payload: image
})

//CREATE 
export const createimage = (image) => async (dispatch, getState) => {

    const response = await csrfFetch('/api/images', {
        method: 'POST',
        body: JSON.stringify(image)
    })

    let newimage;
    if (response.ok) {


        const newimage = await response.json();
        dispatch(addImage(newimage))

    }

    return newimage;
}
//READ

export const getimage = () => async dispatch => {

    const response = await csrfFetch(`/api/users`);

    if (response.ok) {
        const list = await response.json();

        console.log(list)
        dispatch(loadImage(list));
    }
    return response;
};

//DESTROY

export const deleteimage = (image) => async (dispatch, getState) => {

    console.log("image IN DEL image!", image)
    console.log("image id IN DEL image!", image.id)

    const response = await csrfFetch(`/api/images/${image.id}`, {
        method: 'DELETE',

    })
    console.log(response)

    let oldimage;
    if (response.ok) {


        const oldimage = await response.json();
        dispatch(delImage(oldimage))

    }

    return oldimage;
}

///image REDUCER

const initialState = { image: null };

const imageReducer = (state = initialState, action) => {

    let newState
    switch (action.type) {
        case ADD:
            newState = Object.assign({}, state);
            newState = action.payload;
            
            return newState;

        case LOAD:
            const allimages = {};
            action.payload.images.forEach(image => {
                allimages[image.id] = image;
            
            });
            return {

                ...allimages,
                // ...state,
            };
        case DEL:

            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload].images.filter(
                        (imageId) => imageId !== action.id
                    )
                }

            };

        default:
            return state;

    }

}


export default imageReducer;