export const TransactionBox = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Amount</td>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ id, name, amount }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
