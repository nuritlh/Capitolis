export const splitTransactions = (transactions) => {
  const payingTransactions = transactions
    .filter(({ amount }) => amount < 0)
    .map(({ id, tradingParty, amount }) => ({ id, name: tradingParty, amount }))
  const receivingTransactions = transactions
    .filter(({ amount }) => amount > 0)
    .map(({ id, counterparty, amount }) => ({ id, name: counterparty, amount }))

  return { payingTransactions, receivingTransactions }
}

export const convertToSCV = (transactions) => {
  const csvString = [
    ['Item ID', 'TradingParty', 'Counterparty', 'Amount'],
    ...transactions.map(({ id, tradingParty, counterparty, amount }) => [
      id,
      tradingParty,
      counterparty,
      amount,
    ]),
  ]

  console.log(csvString)
  let csvContent =
    'data:text/csv;charset=utf-8,' +
    csvString.map((e) => e.join(',')).join('\n')
  console.log(csvContent)
  const encodedUri = encodeURI(csvContent)
  console.log(encodedUri)
  return encodedUri
}
