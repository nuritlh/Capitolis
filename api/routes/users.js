const express = require('express')
const router = express.Router()

const users = [
  { id: 1, name: 'Nurit' },
  { id: 2, name: 'Naor' },
  { id: 3, name: 'Ira' },
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(users)
})

module.exports = router
