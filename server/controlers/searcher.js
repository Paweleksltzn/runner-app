const User = require('../models/user');

exports.searchUsers = async function(req, res, next) {
    try {
        let searchString = req.query.searchString;
        let users;
        if (searchString.split(' ').length === 2) {
            const name = searchString.split(' ')[0];
            const surname = searchString.split(' ')[1];
            const usersFirstArr =  await User.find({
                name: new RegExp(name, 'i'),
                surname: new RegExp(surname, 'i')
            });
            const usersSecondArr = await User.find({
                name: new RegExp(surname, 'i'),
                surname: new RegExp(name, 'i')
            });
            users = [...usersFirstArr, ...usersSecondArr];
        } else {
            searchString = searchString.split(' ').join('');
            users = await User.find({ nameAndSurname: new RegExp(searchString, 'i') })
        }
        const usersToReturn = users.map(user => {
            return {
                email: user.email,
                name: user.name,
                surname: user.surname,
                isMale: user.isMale,
                accessLevel: user.accessLevel
            }
        });
        return res.json(usersToReturn);
    } catch {
        return res.status(500).send('Wystąpił błąd podczas wyszukiwania użytkownika');
    }
    
}
