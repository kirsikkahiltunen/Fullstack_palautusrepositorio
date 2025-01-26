import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <p> good {props.good}</p>
      <p> neutral {props.neutral}</p>
      <p> bad {props.bad}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        onClick={handleGoodClick}
        text='good'
      />
      <Button
        onClick={handleNeutralClick}
        text='neutral'
      />     
      <Button
        onClick={handleBadClick}
        text='bad'
      />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>          
    </div>
  )
}

export default App
