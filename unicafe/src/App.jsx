import { useState } from 'react'


const StatisticsLine = (props) => {
  return (
      <tr>
        <td>{props.text} </td>
        <td> {props.value}</td>
      </tr>

  )
}

const Statistics = (props) => {

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good + neutral + bad == 0) {
    return (
      <div>
        <h3>statistics</h3>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (

      <div>
        <h3>statistics</h3>
        <table>
          <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticsLine text="positive" value={good / (good + neutral + bad)} />
          </tbody>
        </table>
      </div>
    )
  }


}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>give feedback</h3>

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}




export default App