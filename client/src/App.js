import React, { useEffect, useState } from 'react'
import './App.css'
import logo from './logo.svg'

function App() {
  const [apiResponse, setApiResponse] = useState()

  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => setApiResponse(res))
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p className="App-intro">{apiResponse}</p>
      </header>
    </div>
  )
}

export default App
