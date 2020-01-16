const postDb = require('./postDb');

module.exports = {
    validatePostId: (req, res, next) => {
        const { id } = req.params

        postDb
            .getById(id)
            .then(post => {
                if (post) {
                    req.post = post
                    next()
                } else {
                    res.status(400).json({ message: 'Post does not exist' });
                }
            })
            .catch(err => res.status(500).json({ message: 'Server was unable to retrieve Post', error: err }));
    }
};