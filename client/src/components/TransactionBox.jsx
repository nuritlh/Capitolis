export const TransactionBox = ({transactions}) => {
    return(
       <table>
           <thead><tr><td>Name</td><td>Amount</td></tr></thead>
           <tbody>
           {transactions.map(({id, user, amount})=>(
               <tr key={id}><td>{user.name}</td><td>{amount}</td></tr>
           ))}
           </tbody>
       </table>
    )
}