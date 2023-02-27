const { Thought } = require('../models/Thought');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .populate('thoughtText')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user with that id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => res.json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that id' })
                : res.status(200).json(thought)
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
        },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with that id!' });
                }
                return User.findOneAndUpdate(
                    { username: params.username },
                    { $pull: { thoughts: params.thoughtId } }, // https://www.mongodb.com/docs/manual/reference/operator/update/pull/
                    { new: true }
                );
            })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user with that id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => res.json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that id' })
            : res.json(thought)
        )
            .catch((err) => res.status(500).json(err));
    }
};
module.exports = thoughtController;