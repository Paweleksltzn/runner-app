const  jwt = require('jsonwebtoken');

const secret = 'secr3t';

exports.jwtFactory = (user) => {
    return  jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 14), // 2 tygodnie
        data: {
            email: user.email,
            name: user.name,
            isMale: user.isMale,
            surname: user.surname,
            accessLevel: user.accessLevel,
            _id: user._id
        }
      }, secret);
}

exports.jwtVerivier = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1] || '';
            return jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    return res.status(504).send('Brak autoryzacji');
                }
                req.token = decoded.data
                return next();
            });
    } else {
        return res.status(504).send('Brak autoryzacji');
    }
}
