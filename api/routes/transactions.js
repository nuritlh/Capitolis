const express = require('express')
const router = express.Router()
const { readFromFile, addNewTransaction } = require('./utils')

/* GET transactions. */
router.get('/', function (req, res, next) {
  try {
    let transactions = readFromFile()
    console.log('GET - request to get transactions')
    res.json(transactions)
  } catch (error) {
    console.log('Failed to get transactions')
    res.status(500).send(StatusCodes.BAD_REQUEST)
  }
})

/* POST add transactions. */
router.post('/add', function (req, res, next) {
  console.log('POST - request to add new transaction')
  try {
    const transactions = addNewTransaction(req.body.transaction)
    res.json(transactions)
  } catch (error) {
    console.log('Failed to add new transaction')
    res.status(500).send(StatusCodes.BAD_REQUEST)
  }
})

module.exports = router
