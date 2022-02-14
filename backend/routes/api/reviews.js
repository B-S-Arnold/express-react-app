const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// router.delete('/reviews/:id(\\d+)', asyncHandler(async function (req, res) {
//     const review = await Review.findByPk(req.params.id);
//     if (review) {
//         await review.destroy();
//     }
//     review.destroy()
//     return res.json(review);


// }));

router.put('/:id(\\d+)', asyncHandler(async function (req, res) {
    const review = await Review.findByPk(req.params.id);
    let payload = req.body
    

    if (review) {
        await review.update(payload);
    }
    return res.json({ review });
})
);




module.exports = router;