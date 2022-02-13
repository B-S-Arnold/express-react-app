const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { Image } = require('../../db/models')

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
// router.get('/', asyncHandler(async (req, res, next) => {
//     const spots = await Spot.findAll(req.params.id)
//     // {
//     //     where: {
//     //         userId = req.params.id
//     //     }
//     // }

//     console.log("SPOTS from usersjs", spots)
//     return res.json( spots );
// }));

// router.get('/:id', asyncHandler(async function (req, res) {
//     console.log("WERE IN SPOTS ID")
//     const spot = await Spot.findOne(req.params.id);
//     console.log("SPOT from spotsjs", spot)
//     return res.json(spot);

// }));

router.delete('/:id(\\d+)', asyncHandler(async function (req, res) {
    const spot = await Spot.findByPk(req.params.id);
    if (spot) {
        await spot.destroy();
    }
    spot.destroy()
    return res.json(spot);
    

}));

router.put('/:id(\\d+)', asyncHandler(async function (req, res) {
        const spot = await Spot.findByPk(req.params.id);
        let payload = req.body
        console.log("PAYLOAD IN ROUTER PUT!", payload)
        // const { userId, address, city, state, country, name, price, description } = req.body;
        // const spot = await Spot.update({ userId, address, city, state, country, name, price, description });
    if (spot) {
        await spot.update(payload);
    }
        return res.json({spot});
    })
);

router.get('/', asyncHandler(async function (req, res) {
    // const spotId = req.params.id;
    const reviews = await Review.findAll(req.params.id)
    const images = await Image.findAll(req.params.id)
    const request = await (req.params)
    // const images = await Image.findAll(req.params.id)
    
    // {
    //     where: {
    //         userId = req.params.id
    //     }
    // }

    console.log("reviewS from usersjs", reviews)
    return res.json({ reviews, images, request });
}));

// router.get('/', asyncHandler(async function (req, res) {
//     // const spotId = req.params.id;
//     // const reviews = await Review.findAll(req.params.id)
//     const images = await Image.findAll(req.params.id)

//     // {
//     //     where: {
//     //         userId = req.params.id
//     //     }
//     // }

    
//     return res.json({ images });
// }));

// router.put(
//     '/:id(\\d+)',
    
//     asyncHandler(async function (req, res) {
//         const id = await Spot.update(req.body);
//         const spot = await Spot.one(id);
//         return res.json(spot);
//     })
// );
// async function list() {
//     return await Spot.findAll();
// }


module.exports = router;

