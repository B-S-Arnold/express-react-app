const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// router.post(
//     '/',
//     asyncHandler(async (req, res) => {
//         const { userId, spotId, content } = req.body;
//         const review = await Review.create({ userId, spotId, content });

//         // await setTokenCookie(res, review);
//         console.log(review)

//         return res.json({
//             review
//         });
//     })
// );

// router.get('/', asyncHandler(async function (req, res) {
//     const reviews = await Review.findAll(req.params.id)
//     // {
//     //     where: {
//     //         userId = req.params.id
//     //     }
//     // }

//     console.log("reviews from reviews", reviews)
//     return res.json({ reviews });
// }));



router.delete('/:id(\\d+)', asyncHandler(async function (req, res) {
    const review = await Review.findByPk(req.params.id);
    if (review) {
        await review.destroy();
    }
    review.destroy()
    return res.json(review);


}));

router.put('/:id(\\d+)', asyncHandler(async function (req, res) {
    const review = await Review.findByPk(req.params.id);
    let payload = req.body
    console.log("PAYLOAD IN ROUTER PUT!", payload)

    if (review) {
        await review.update(payload);
    }
    return res.json({ review });
})
);




module.exports = router;