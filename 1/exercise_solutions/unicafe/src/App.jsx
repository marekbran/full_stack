import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>Give feedback</h1>

        <Button handleClick={() => setGood(good + 1)} text='Good' />
        <Button handleClick={() => setBad(bad + 1)} text='Bad' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />

        <h2>Statistics</h2>

        <p>Good: {good}</p> <p>Neutral: {neutral}</p> <p>Bad: {bad}</p>
    </div>
  )
}

export default App