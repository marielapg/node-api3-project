const express = require('express');
const userDb = require('./userDb.js')
const postDb = require('../posts/postDb.js')

const { validateId, validateUser, validatePost } = require('./userMiddleware.js')

const router = express.Router();
router.post('/', validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ message: 'Server was unable to create new User', error: err}))
});

router.post('/:id/posts', validateId, validatePost,  (req, res) => {
  const { id } = req.params
  const { text } = req.body

  postDb
    .insert({ user_id: id, text })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: 'Server was unable to create Post', error: err }))
});
router.get('/', (req, res) => {
  userDb
  .get()
  .then(users => res.status(200).json(users))
  .catch(err => res.status(500).json({ message: 'Server was unable to retrieve Users', error: err }))
});


router.get('/:id', validateId, (req, res) => {
  const { id } = req.params

  userDb
  .getById(id)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({ message: 'Server was unable to retrieve User', error: err }))
});


router.get('/:id/posts', validateId, (req, res) => {
  const { id } = req.params

  userDb
  .getUserPosts(id)
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(500).json({ message: 'Server was unable to retrieve Posts', err}))
});

router.delete('/:id', validateId, (req, res) => {
  const { id } = req.params

  userDb
  .remove(id)
  .then(() => res.status(200).json(`${req.user.name} was deleted`))
  .catch(err => res.status(500).json({ message: 'Server was unable to delete User', err}))
});

router.put('/:id', validateId, validateUser, (req, res) => {
  const { id } = req.params
  const changes = req.body

  userDb
  .update(id, changes)
  .then(() => res.status(200).json(`${req.user.name} was updated to ${changes.name}`))
  .catch(err => res.status(500).json({ message: 'Server was unable to update User', err}))
});
module.exports = router;
