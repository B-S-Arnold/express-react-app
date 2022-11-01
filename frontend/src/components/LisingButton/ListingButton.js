import '../AllListings/AllListings.css'

import React, { useEffect, useState } from "react";
import { getImage } from '../../store/image';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";





const ListingButton = ({spot, spotImageArr}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getImage())
    }, [dispatch])


    const [index, setIndex] = useState(0)
    
    let image = spotImageArr[index]


    // const images = useSelector(state => {

    //     return state.image;
    // });



    const onNext = (e) => {
        e.preventDefault()
        setIndex(index + 1)
        // setyVal(pointerY)

    }

    const onPrev = (e) => {
        e.preventDefault()
        setIndex(index - 1)
        // setyVal(pointerY)

    }

    let path = `/spots/${spot.id}`

    const handleClick = (e) => {
        e.preventDefault();
        history.push(path);
    };

    const prevNextDiv = () => {
        return (
            <div>
                {index === 0 ? <></> : <><button onClick={onPrev} className='toPrev'>&#60;</button></>}
                {index === spotImageArr.length - 1 ? <></> : <><button onClick={onNext} className='toNext'>&#62;</button></>}


            </div>
        )
    }

    return (
        <div className='spotbtndiv' key={spot.id}>
            {prevNextDiv()}
            <button className="spotbtn" onClick={handleClick} key={spot.id}>

                <div className='imgdiv'>
                    {/* {allImages()} */}

                    <div className='fotodiv' key={image?.id}>
                        {/* <button onClick={clickToPrev} >To Prev</button>
                         <button onClick={clickToNext} >To Next</button> */}
                        <img
                            className='foto'
                            src={image?.url}
                            alt="new"
                        />


                    </div>

                </div>

                <div className='citydiv'>
                    {spot.city}, {spot.state}
                </div>
                <div className='pricediv'>
                    <div className='price'>${spot.price} </div>
                    night
                </div>

            </button >
        </div>
    )

}

export default ListingButton;