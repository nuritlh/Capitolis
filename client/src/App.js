import { css } from '@emotion/css'
import React, { useEffect, useState } from 'react'
import { fetchTransactions, fetchUsers } from './api'
import { AddTransactionModal } from './components/AddTransactionModal.tsx'
import { TransactionBox } from './components/TransactionBox'
import { fullTransactionsDetails } from './utils'

function App() {
  const [payingTransactions, setPayingTransactions] = useState([])
  const [receivingTransactions, setReceivingTransactions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await fetchTransactions()
      const users = await fetchUsers()

      const { payingTransactions, receivingTransactions } =
        fullTransactionsDetails(transactions, users)
      setPayingTransactions(payingTransactions)
      setReceivingTransactions(receivingTransactions)
    }
    fetchData()
  }, [])

  return (
    <div className={container}>
      <div className={transactions}>
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
      <div className={buttons}>
        <AddTransactionModal />
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

const transactions = css`
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
