const express = require('express')
const router = express.Router()

const transactions = [
  { id: 1, tradingParty: 1, counterparty: 2, amount: -400 },
  { id: 2, tradingParty: 1, counterparty: 2, amount: 500 },
  { id: 3, tradingParty: 1, counterparty: 3, amount: 100 },
  { id: 4, tradingParty: 1, counterparty: 3, amount: 100 },
  { id: 5, tradingParty: 2, counterparty: 1, amount: -100 },
]

/* GET transactions listing. */
router.get('/', function (req, res, next) {
  res.json(transactions)
})

module.exports = router
