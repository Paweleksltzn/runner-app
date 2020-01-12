const User = require('../models/user');
const io = require('../util/socket');

exports.searchUsers = async function(req, res, next) {
    try {
        let searchString = req.query.searchString;
        let users;
        io.getIO().to(req.token._id).emit('new-friend', {test: 'd'});
        if (searchString.split(' ').length === 2) {
            const name = searchString.split(' ')[0];
            const surname = searchString.split(' ')[1];
            const usersFirstArr =  await User.find({
                name: new RegExp(name, 'i'),
                surname: new RegExp(surname, 'i'),
                isActive: true
            }).populate('userProfile');
            const usersSecondArr = await User.find({
                name: new RegExp(surname, 'i'),
                surname: new RegExp(name, 'i'),
                isActive: true
            }).populate('userProfile');
            users = [...usersFirstArr, ...usersSecondArr];
        } else {
            searchString = searchString.split(' ').join('');
            users = await User.find({ nameAndSurname: new RegExp(searchString, 'i'), isActive: true }).populate('userProfile');
        }
        const usersToMap = users.filter(user => user._id !== req.token._id);
        const usersToReturn = usersToMap.map(user => {
            return {
                email: user.email,
                name: user.name,
                surname: user.surname,
                isMale: user.isMale,
                accessLevel: user.accessLevel,
                userProfile: user.userProfile
            }
        });
        return res.json(usersToReturn);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas wyszukiwania użytkownika');
    }
    
}
