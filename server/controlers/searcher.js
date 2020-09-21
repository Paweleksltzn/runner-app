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

exports.searchFriends = async (req,res,next) => {
    try{
      let searchString = req.query.searchString;
      const limit = +req.query.limit;
      const offset = +req.query.offset;
      const currentUser = await User.findById(req.token._id).populate('userProfile');
      const currentUserFriends = currentUser.userProfile.friends;
      let users = [];
      
      if(searchString.split(" ").length === 2 || searchString.split(" ").length > 2){
        let name = searchString.split(" ")[0];
        let surname = searchString.split(" ")[1];
  
        users = await UserProfile.find({
          $or: [
            { name: { $regex: new RegExp(name, "i") } },
            { surname: { $regex: new RegExp(surname, "i") } },
            { name: { $regex: new RegExp(surname, "i") } },
            { surname: { $regex: new RegExp(name, "i") } },
          ],
        });
      } else if(searchString.split(" ").length === 1){
          users = await UserProfile.find({
            $or: [
              { name: { $regex: new RegExp(searchString, "i") } },
              { surname: { $regex: new RegExp(searchString, "i") } },
            ],
          });
      }
  
      let formatedUsers = users.map(user => {
        return user._id;
      });
  
      let finalArr = [];
  
      formatedUsers.some(friend => {
        if(currentUserFriends.includes(friend)){
          finalArr.push(friend);
        };
      });
  
      const usersToReturn = await UserProfile.find({_id: {$in: finalArr}}).limit(limit).skip(offset);
  
      const friendsToReturn = usersToReturn.map((user) => {
        return {
          email: user.email,
          name: user.name,
          surname: user.surname,
          isMale: user.isMale,
          accessLevel: user.accessLevel,
          userProfile: user._id,
          imgUrl: user.imgUrl,
          profileDescription: user.profileDescription,
        };
      });
      //console.log('usersToReturn',friendsToReturn);
      res.status(200).json(friendsToReturn);
  
    } catch(err) {
      console.log(err);
      return res
        .status(500)
        .send("Wystąpił błąd podczas wyszukiwania użytkownika");
      }
  };
  