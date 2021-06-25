export const splitTransactions = (transactions) => {
  const payingTransactions = transactions
    .filter(({ amount }) => amount < 0)
    .map(({ id, tradingParty, amount }) => ({ id, name: tradingParty, amount }))
  const receivingTransactions = transactions
    .filter(({ amount }) => amount > 0)
    .map(({ id, counterparty, amount }) => ({ id, name: counterparty, amount }))

  return { payingTransactions, receivingTransactions }
}
