import '../AllListings/AllListings.css'

import React, { useEffect, useState } from "react";
import { getImage } from '../../store/image';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";





const ListingButton = ({ spot, spotImageArr }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
        navigate(path);
    };

    const imagePos = () => {

        const dots = spotImageArr.map(img => {

            if (img === spotImageArr[index]) {

                return (
                    <div key={img.id} className='iDot'>.</div>
                )
            }

            return (
                <div key={img.id} className='dot'>.</div>
            )
        });

        return (
            <>
                {spotImageArr?.length > 1 ?
                    <div className='dotsOuter'>
                        <div className='dotsInner'>
                            {dots}
                        </div>
                    </div>


                    : <></>}
            </>
        )
    }

    const arrowDiv = () => {
        return (
            <div className='arrowDiv'>
                <div className='inArrowDiv'>
                    {index === 0 ? <div /> : <><button onClick={onPrev} className='toPrev'>&#60;</button></>}
                    {index === spotImageArr.length - 1 ? <div /> : <><button onClick={onNext} className='toNext'>&#62;</button></>}
                </div>

            </div>
        )
    }



    return (
        <div className='spotbtndiv' key={spot.id}>
            <div>
                {arrowDiv()}
            </div>
            <button className="spotbtn" onClick={handleClick} >

                <div className='imgdiv'>

                    <div className='fotodiv' key={image?.id}>

                        <img
                            className='foto'
                            src={image?.url}
                            alt="new"
                        />

                    </div>

                </div>

                {imagePos()}

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