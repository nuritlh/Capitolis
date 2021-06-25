import { css } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { fetchTransactions } from './api'
import { AddTransactionModal } from './components/AddTransactionModal'
import { TransactionBox } from './components/TransactionBox'
import { splitTransactions } from './utils'

function App() {
  const [transactions, setTransactions] = useState([])
  const [payingTransactions, setPayingTransactions] = useState([])
  const [receivingTransactions, setReceivingTransactions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactions()
      setTransactions(transactions)
      setData(transactions)
    }
    fetchData()
  }, [])

  const setData = (transactions) => {
    const { payingTransactions, receivingTransactions } =
      splitTransactions(transactions)
    setPayingTransactions(payingTransactions)
    setReceivingTransactions(receivingTransactions)
  }

  const addTransaction = async (transactions) => {
    setTransactions(transactions)
    setData(transactions)
  }

  return (
    <div className={container}>
      {transactions ? (
        <div className={transactionsStyle}>
          <div>
            <h2>Paying</h2>
            {payingTransactions && (
              <TransactionBox transactions={payingTransactions} />
            )}
          </div>
          <div>
            <h2>Receiving</h2>
            {receivingTransactions && (
              <TransactionBox transactions={receivingTransactions} />
            )}
          </div>
        </div>
      ) : (
        <div>No Transactions</div>
      )}
      <div className={buttons}>
        <AddTransactionModal transactions={addTransaction} />
        <button>Compress Transactions</button>
      </div>
    </div>
  )
}

export default App

const container = css`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const transactionsStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const buttons = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
`
