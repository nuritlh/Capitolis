import { isEqual, uniqWith } from 'lodash'
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

  let csvContent =
    'data:text/csv;charset=utf-8,' +
    csvString.map((e) => e.join(',')).join('\n')
  const encodedUri = encodeURI(csvContent)
  return encodedUri
}

export const compress = (transactions) => {
  const pairs = uniqWith(
    transactions.map(({ tradingParty, counterparty }) => {
      const key = [tradingParty, counterparty]
      key.sort()
      return key
    }),
    isEqual,
  )

  const compress = pairs.map(([personA, personB]) => [
    [personA, personB],
    transactions.reduce((acc, { amount, tradingParty, counterparty }) => {
      if (tradingParty === personA && counterparty === personB) {
        acc += amount
      } else if (tradingParty === personB && counterparty === personA) {
        acc -= amount
      }

      return acc
    }, 0),
  ])

  const a = compress.map((transaction, idx) => ({
    id: idx + 1,
    tradingParty: transaction[0][0],
    counterparty: transaction[0][1],
    amount: transaction[1],
  }))
  return a
}
