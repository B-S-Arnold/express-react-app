const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;


// const router = require('express').Router();

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models')
// const asyncHandler = require('express-async-handler');
// const { requireAuth } = require('../../utils/auth.js');

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

// // GET /api/set-token-cookie

// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// }));

// // GET /api/require-auth

// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// module.exports = router;