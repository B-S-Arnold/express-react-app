import './AllListings.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as spotActions from '../../store/spot';
import { getSpot } from '../../store/spot';
import ReviewFormModal from '../ReviewModal';
import { getReview } from '../../store/review';
import { getImage } from '../../store/image';
import ListingButton from '../LisingButton/ListingButton';


function AllListingsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpot())
        dispatch(getImage())
    }, [dispatch])


    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("kjl");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const [index, setIndex] = useState(0)
    // const [yVal, setyVal] = useState('')

    const { spotId } = useParams();

    const history = useHistory();

    const toPrev = document?.getElementsByClassName('toPrev')[0]
    const toNext = document?.getElementsByClassName('toNext')[0]
    // const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        

        // const onNext = (e) => {
        //     e.preventDefault()
        //     setIndex(index+1)
        //     // setyVal(pointerY)

        // }

        // const onPrev = (e) => {
        //     e.preventDefault()
        //     setIndex(index-1)
        //     // setyVal(pointerY)

        // }

        
        // toPrev.addEventListener('click', onPrev)
        // toNext.addEventListener('click', onNext)

        // return (
        //     toPrev.removeEventListener('click', onPrev),
        //     toNext.removeEventListener('click', onNext)
        // )

    }, []);




    const spots = useSelector(state => {

        return state.spot;
    });

    const images = useSelector(state => {

        return state.image;
    });

    const reviews = useSelector(state => {

        return state.review;
    });

    const spotsArr = Object.values(spots);
    let imgArr = Object.values(images)



    const spotMapFunc = () => spotsArr.map((spot) => {
        if (spot !== null) {

            
            console.log(index)
            let spotImageArr = imgArr?.filter(img => img?.spotId === spot.id)


            return (
                
                    <ListingButton spot={spot} spotImageArr={spotImageArr} />
                
            )
            // let thisImage = thisImageArr[index]

            // let allImages = () => imgArr.map((image) => {


            //     if (image !== null && parseInt(thisSpot.id) === image.spotId) {
                
                    
            //         return (
                        
            //             <div className ='fotodiv' key={image.id}>
            //                 {/* <button onClick={clickToPrev} >To Prev</button>
            //                 <button onClick={clickToNext} >To Next</button> */}
            //                 <img
            //                     className='foto'
            //                     src={image.url}
            //                     alt="new"
            //                 />


            //             </div>

            //         )
            //     }
            // })

            // const onNext = (e) => {
            //     e.preventDefault()
            //     setIndex(index + 1)
            //     // setyVal(pointerY)

            // }

            // const onPrev = (e) => {
            //     e.preventDefault()
            //     setIndex(index - 1)
            //     // setyVal(pointerY)

            // }
            // const prevNextDiv = () => {
            //     return (
            //         <div>
            //             {index === 0 ? <></> : <><button onClick={onPrev} className='toPrev'>&#60;</button></>}
            //             {index === thisImageArr.length - 1 ? <></> : <><button onClick={onNext} className='toNext'>&#62;</button></>}
                        
                        
            //         </div>
            //     )
            // }
            // let path = `/spots/${spot.id}`

            // const handleClick = (e) => {
            //     e.preventDefault();
            //     history.push(path);
            // };

            

            // return (
            //     <div className='spotbtndiv' key={spot.id}>
            //         {prevNextDiv()}
            //         <button className= "spotbtn" onClick={handleClick} key={spot.id}>
                        
            //             <div className='imgdiv'>
            //                 {/* {allImages()} */}

            //                 <div className ='fotodiv' key={thisImage?.id}>
            //                 {/* <button onClick={clickToPrev} >To Prev</button>
            //              <button onClick={clickToNext} >To Next</button> */}
            //                  <img
            //                      className='foto'
            //                      src={thisImage?.url}
            //                      alt="new"
            //                  />


            //             </div>

            //             </div>

            //             <div className='citydiv'>
            //                 {spot.city}, {spot.state}
            //             </div>
            //             <div className='pricediv'>
            //                 <div className='price'>${spot.price} </div>
            //                 night
            //             </div>

            //         </button >
            //     </div>
            // )
        }

    })




    return (
        <>

            {!spotsArr.length && <span>No spots available right now.</span>}
            <div className="spot-list">
                {spotMapFunc()}
            </div>
        </>
    );
}

export default AllListingsPage;