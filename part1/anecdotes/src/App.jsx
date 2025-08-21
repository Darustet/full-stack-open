import { useState } from 'react'

const RandomizerButton = ({ anecdotes, setSelected }) => {
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }
  return (
    <div>
      <button onClick={handleClick}>
        Next Anecdote
      </button>
    </div>
  )
}

const VoteButton = ({votes, selected, setVotes}) => {
  const handleClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  return (
    <div>
      <button onClick={handleClick}>
        Vote
      </button>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const mostVotesIndex = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p style={{margin: "0px"}}>has {votes[selected]} votes</p>
      <VoteButton votes={votes} selected={selected} setVotes={setVotes} />
      <RandomizerButton anecdotes={anecdotes} setSelected={setSelected} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotesIndex]}
      <p style={{margin: "0px"}}>has {votes[mostVotesIndex]} votes</p>
    </div>
  )
}

export default App