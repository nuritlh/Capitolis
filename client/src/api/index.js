import axios from 'axios'

const baseUrl = 'http://localhost:9000'

export const fetchTransactions = async () => {
  const results = await axios(`${baseUrl}/transactions`)
  return results.data
}

export const addTransaction = async (transaction) => {
  const results = await axios.post(`${baseUrl}/transactions/add`, {
    transaction,
  })
  return results.data
}
