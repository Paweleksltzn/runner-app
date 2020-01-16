const User = require('../models/user');

const jwtManagment = require('../auth-guards/jwt-managment');

exports.setTrainer = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        user.accessLevel = 2;
        user.save();
        return res.json(jwtManagment.jwtFactory(user));
    } catch(err) {
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    }
}