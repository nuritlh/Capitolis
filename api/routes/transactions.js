const express = require('express')
const router = express.Router()
const { transactions, addNewTransaction } = require('./utils')

/* GET transactions. */
router.get('/', function (req, res, next) {
  res.json(transactions)
})

/* POST add transactions. */
router.post('/add', function (req, res, next) {
  try {
    const transactions = addNewTransaction(req.body.transaction)
    res.json(transactions)
  } catch (error) {
    res.status(500).send(StatusCodes.BAD_REQUEST)
  }
})

module.exports = router
