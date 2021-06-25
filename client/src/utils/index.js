export const fullTransactionsDetails = (transactions, users) => {
  const fullTransactions = transactions.map(
    ({ id, tradingParty, counterparty, amount }) => {
      const pays = users.find(({ id: userId }) => userId === tradingParty)
      const receives = users.find(({ id: userId }) => userId === counterparty)
      return {
        id,
        pays,
        receives,
        amount,
      }
    },
  )

  const payingTransactions = fullTransactions
    .filter(({ amount }) => amount < 0)
    .map(({ id, pays, amount }) => ({ id, user: pays, amount }))
  const receivingTransactions = fullTransactions
    .filter(({ amount }) => amount > 0)
    .map(({ id, receives, amount }) => ({ id, user: receives, amount }))

  return { payingTransactions, receivingTransactions }
}
