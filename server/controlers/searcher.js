const User = require('../models/user');
const UserProfile = require('../models/userProfile');

exports.searchUsers = async function(req, res, next) {
    try {
        let searchString = req.query.searchString;
        const limit = +req.query.limit;
        const offset = +req.query.offset;
        let users;
        if (searchString.split(' ').length === 2) {
            const name = searchString.split(' ')[0];
            const surname = searchString.split(' ')[1];
            const usersFirstArr =  await User.find({
                name: new RegExp(name, 'i'),
                surname: new RegExp(surname, 'i'),
                isActive: true
            }).limit(limit).skip(offset).populate('userProfile');
            const usersSecondArr = await User.find({
                name: new RegExp(surname, 'i'),
                surname: new RegExp(name, 'i'),
                isActive: true
            }).limit(limit).skip(offset).populate('userProfile');
            users = [...usersFirstArr, ...usersSecondArr];
        } else {
            searchString = searchString.split(' ').join('');
            users = await User.find({ nameAndSurname: new RegExp(searchString, 'i'), isActive: true }).limit(limit).skip(offset).populate('userProfile');
        }
        const usersToMap = users.filter(user => {
            return user.email !== req.token.email;
        });
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
