const userDb = require('./userDb.js');

module.exports = {
    validateId: (req, res, next) => {
        const { id } = req.params

        userDb
            .getById(id)
            .then(user => {
                if (user) {
                    req.user = user
                    next()
                } else {
                    res.status(400).json({ message: 'User does not exist' })
                }
            })
            .catch(err => res.status(500).json({ message: 'Server unable to retrieve User', error: err }))
    },

    validateUser: (req, res, next) => {
        const { name } = req.body

        if (!req.body) {
            res.status(400).json({ message: 'Missing user data' })
        } else if (!name) {
            res.status(400).json({ message: 'Missing user name' })
        } else {
            next()
        }
    },

    validatePost: (req, res, next) => {
        const { text } = req.body

        if (!req.body) {
            res.status(400).json({ message: 'Missing post data' })
        } else if (!text) {
            res.status(400).json({ message: 'Missing post text' })
        } else {
            next()
        };
    }
};