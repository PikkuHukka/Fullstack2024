import { useState } from 'react'

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



  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [selected, setSelected] = useState(0)
  const [topAnecdote, setTop] = useState({ id: 0, votes: 0 })

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length - 1)))}>
        next anecdote
      </button>

      <p>Votes: {points[selected]}</p>
      <button onClick={() => {
        const newPoints = { ...points }
        newPoints[selected] = points[selected] + 1
        setPoints(newPoints)
        if (points[selected] >= topAnecdote.votes) {
          const tempTop = { ...topAnecdote }
          tempTop.votes += 1
          tempTop.id = selected
          setTop(tempTop)
        }


      }
      }>
        Vote
      </button>
      <h3>Anecdote with the most votes</h3>
      <p>{anecdotes[topAnecdote.id]}</p>
      <p>Has {topAnecdote.votes} votes</p>
    </div>
  )
}

export default App