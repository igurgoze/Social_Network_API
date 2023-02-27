const User = require('../models/User');

// from class repo exmaple
const userController = {
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => {
                console.log( { message: err } )
                res.status(500).json(err)
            });
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // new user
    createUser(req, res) {
        User.create(req.body)
            .then((UserData) => res.json(UserData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((UserData) => {
                if (!UserData) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
                return res.json(UserData);
            })
            .catch((err) => res.status(500).json(err));
        },
    deleteUser( req, res ) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((deletedUser) => 
                !deletedUser ? res.status(404).json({ message: 'No user with this ID'})
                : User.findOneAndUpdate(
                    { users: req.params.userId },
                    { $pull: { users: req.params.userId } },
                    { new: false }
                )
            )
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                }
                res.json('You have deleted a user.');
            })
            .catch(err => res.json(err));
        },
        createFriend(req, res){
            User.findOneAndUpdate(
                {_id: req.params.userId},
                { $addToSet: {friends: req.params.friendId}},
                { runValidators: true, new: true}
            )
            .then((user) =>{
                !user
                ? res.status(404).json({message: "No user found"})
                : res.status(200).json(user)
            })
            .catch((err) => res.status(500).json(err))
        },
        deleteFriend(req,res){
            User.findOneAndUpdate(
                {_id: req.params.userId},
                { $pull: {friends: req.params.friendId}},
                { new: true}
            )
            .then((user)=>{
                !user
                ? res.status(404).json({message: "No user found"})
                : res.status(200).json(user)
            })
            .catch((err)=>res.status(500).json(err))
        }
};

module.exports = userController;