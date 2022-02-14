const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { spotId, url} = req.body;
        const image = await Image.create({ spotId, url});

        // await setTokenCookie(res, spot);
        

        return res.json({
            image
        });
    })
);

router.delete('/:id(\\d+)', asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    if (image) {
        await spot.destroy();
    }
    image.destroy()
    return res.json(image);


}));







module.exports = router;