import { useState } from 'react'

const Statistics = (props) => {
  if (props.total == 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <p> good {props.good}</p>
      <p> neutral {props.neutral}</p>
      <p> bad {props.bad}</p>
      <p> all {props.total}</p>
      <p> average {props.average}</p>
      <p> positive {props.positive} %</p>
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
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)
    setAverage((updatedGood + (bad * (-1)))/updatedTotal)
    setPositive((updatedGood/updatedTotal)*100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = updatedNeutral + good + bad
    setTotal(updatedTotal)
    setAverage((good + (bad * (-1)))/updatedTotal)
    setPositive((good/updatedTotal)*100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = updatedBad + good + neutral
    setTotal(updatedTotal)
    setAverage((good +(updatedBad * (-1)))/updatedTotal)
    setPositive((good/updatedTotal)*100)
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
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App
