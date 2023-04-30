import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({totals}) => {
  const [good, bad, neutral] = totals
  const all = good + bad + neutral

  if (all <= 0) return <p>No feedback given</p>

  return (
    <table>
        <tbody>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="All" value={good + bad + neutral}/>
        <StatisticLine text="Average" value={(good-bad)/(good+bad+neutral)}/>
        <StatisticLine text="Positive" value={good/(good+bad+neutral)*100 + "%"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // salve os cliques de cada botão em seu próprio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = "Give Feedback";

  const positiveHandleClick = () => setGood(good + 1)
  const negativeHandleClick = () => setBad(bad + 1)
  const neutralHandleClick = () => setNeutral(neutral + 1)

  return (
    <div>
      <Title title={title}/>
      <Button name="good" onClick={() => positiveHandleClick()} />
      <Button name="neutral" onClick={() => neutralHandleClick()} />
      <Button name="bad" onClick={() => negativeHandleClick()} />
      <Title title={"Statistics"}/>
      <Statistics totals={[good, bad, neutral]}/>      
    </div>
  )
}

export default App