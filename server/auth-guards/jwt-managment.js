const  jwt = require('jsonwebtoken');

const secret = 'secr3t';

// exports.jwtFactory = (user) => {
//     return  jwt.sign({
//         exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 14), // 2 tygodnie
//         data: {
//             email: user.email,
//             nickName: user.nickName,
//             platform: user.platform,
//             team: user.team,
//             accessLevel: user.accessLevel,
//             teamPosition: user.teamPosition,
//             nationality: user.nationality,
//             registrationYear: user.registrationYear,
//             firstStepsYear: user.firstStepsYear
//         }
//       }, secret);
// }

exports.jwtVerivier = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1] || '';
            return jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    console.log(err)
                    return res.status(500).send('wystapil blad');
                }
                req.token = decoded.data
                return next();
            });
    } else {
        return res.status(500).send('wystapil blad');
    }
}
