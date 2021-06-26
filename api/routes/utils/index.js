const fs = require('fs')

const addNewTransaction = (transaction) => {
  try {
    const transactions = readFromFile()
    const newTransaction = {
      id: transactions.length + 1,
      tradingParty: 'Nurit',
      counterparty: transaction.name,
      amount: transaction.amount,
    }
    transactions.push(newTransaction)
    writeToFile(transactions)
    return transactions
  } catch (error) {}
}

const readFromFile = () => {
  let rawdata = fs.readFileSync('transactions.json')
  return JSON.parse(rawdata)
}

const writeToFile = (newFile) => {
  let data = JSON.stringify(newFile, null, 2)
  fs.writeFile('transactions.json', data, (err) => {
    if (err) throw err
    console.log('Data written to file')
  })
}

module.exports = { readFromFile, addNewTransaction }
