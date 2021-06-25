// const transactions = require('./utils/data')
const transactions = [
  { id: 1, tradingParty: 'Nurit', counterparty: 'Naor', amount: -400 },
  { id: 2, tradingParty: 'Nurit', counterparty: 'Naor', amount: 500 },
  { id: 3, tradingParty: 'Naor', counterparty: 'Ira', amount: 100 },
  { id: 4, tradingParty: 'Nurit', counterparty: 'Ira', amount: 100 },
  { id: 5, tradingParty: 'Ira', counterparty: 'Nurit', amount: -100 },
]

const addNewTransaction = (transaction) => {
  const newTransaction = {
    id: transactions.length + 1,
    tradingParty: 'Nurit',
    counterparty: transaction.name,
    amount: transaction.amount,
  }
  transactions.push(newTransaction)
  return transactions
}

module.exports = { transactions, addNewTransaction }
