const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//val errors
// const validateEntries = [
//     check('credential')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage('Please provide a valid email or username.'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a password.'),
//     handleValidationErrors
// ];


// userId: 1,
// address: "Upper Left Side",
// city: "Ring Two",
// state: "Newest New Hampshire",
// country: "Saturn",
// name: "Beautiful Ledge",
// price: 10,
// description: "Don't fall off..."

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { userId, address, city, state, country, name, price, description } = req.body;
        const spot = await Spot.create({ userId, address, city, state, country, name, price, description});

        // await setTokenCookie(res, spot);
        console.log(spot)
        
        return res.json({
            spot
        });
    })
);

module.exports = router;

