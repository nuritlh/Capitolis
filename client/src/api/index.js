import axios from 'axios'

const baseUrl = 'http://localhost:9000'

export const fetchTransactions = async () => {
  const results = await axios(`${baseUrl}/transactions`)
  return results.data
}

export const fetchUsers = async () => {
  const results = await axios(`${baseUrl}/users`)
  return results.data
}
