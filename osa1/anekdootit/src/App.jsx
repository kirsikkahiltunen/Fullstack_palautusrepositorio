import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const AnecdoteLine = (props) => {
  return (
    <div>
      {props.anecdote}
      <p>has {props.votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteClicks, setVotes] = useState(new Array(8).fill(0))
  let max = 0

  const selectRandom = () => {
    const updatedSelected = (Math.floor(Math.random() * 8))
    setSelected(updatedSelected)
  }

  const addVote = () => {
    const copy = [...voteClicks]
    copy[selected] += 1
    setVotes(copy)
  }

  const MaxVotes = () => {
    const index = voteClicks.indexOf(Math.max(...voteClicks))
    return (
      <div>
        <AnecdoteLine anecdote = {anecdotes[index]} votes = {voteClicks[index]} />
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <AnecdoteLine anecdote = {anecdotes[selected]} votes = {voteClicks[selected]} />
      <Button
        onClick={addVote}
        text='vote'
      />
      <Button
        onClick={selectRandom}
        text='next anecdote'
      />
      <h2>Anecdote with most votes</h2>
      <MaxVotes />
    </div>
  )
}

export default App
