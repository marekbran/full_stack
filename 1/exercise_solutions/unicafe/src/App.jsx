import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <tr>
            <td>Good: {props.good}</td>
          </tr>
          <tr>
            <td>Neutral: {props.neutral}</td>
          </tr>
          <tr>
            <td>Bad: {props.bad}</td>
          </tr>
          <tr>
            <td>All: {props.good + props.neutral + props.bad}</td>
          </tr>
          <tr>
            <td>Average: {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</td>
          </tr>
          <tr>
            <td>Positive: {(props.good / (props.good + props.neutral + props.bad)) * 100} %</td>
          </tr>
        </tbody>
      </table>
    );
  }
};

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

        <Statistics good={good} bad={bad} neutral={neutral} />
        
    </div>
  )
}

export default App