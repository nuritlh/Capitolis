import { css } from '@emotion/css'
import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import { fetchTransactions } from './api'
import { AddTransactionModal } from './components/AddTransactionModal'
import { TransactionBox } from './components/TransactionBox'
import { compress, convertToSCV, splitTransactions } from './utils'

function App() {
  const [transactions, setTransactions] = useState([])
  const [payingTransactions, setPayingTransactions] = useState([])
  const [receivingTransactions, setReceivingTransactions] = useState([])
  const [csvLink, setCsvLink] = useState('')

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

  const compressAndDownloadCSV = () => {
    const compressTransactions = compress(transactions)
    setCsvLink(convertToSCV(compressTransactions))
  }

  return (
    <div className={container}>
      <div className={header}>
        <h2>Paying</h2>
        <h2>Receiving</h2>
      </div>
      {transactions ? (
        <div className={transactionsStyle}>
          <div>
            {payingTransactions && (
              <TransactionBox transactions={payingTransactions} />
            )}
          </div>
          <div>
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
        <Button
          variant="contained"
          color="primary"
          onClick={compressAndDownloadCSV}
        >
          <a href={csvLink} className={link}>
            Compress Transactions
          </a>
        </Button>
      </div>
    </div>
  )
}

export default App

const container = css`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  margin: 1rem auto;
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: 0 0.25rem 1rem -0.25rem rgba(63, 81, 181, 0.16);
`

const header = css`
  display: flex;
  text-align: center;
  justify-content: space-around;
  color: rgb(63, 81, 181);
`

const transactionsStyle = css`
  display: flex;
  justify-content: space-around;
`

const buttons = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
`

const link = css`
  text-decoration: none;
  color: white;
`
