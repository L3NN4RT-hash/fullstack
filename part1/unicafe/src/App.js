import { useState } from 'react'

const Header = ({head}) => 
<h1>{head}</h1>

const Button = ({click, txt}) => 
  <button onClick={click}>
    {txt}
    </button>

const SubHeader = ({subHead}) =>
<h2>{subHead}</h2>    


const Statistics = ({good, neutral, bad}) => {
  const sum = good+neutral+bad
  const dividend = good-bad
  const positive = (good/sum)*100
  if (sum == 0) {
    return(
      <div>
        No feedback given!
      </div>
    )
  }
  return (
 <table>
   <StatisticLine txt="Good: " value={good} />
   <StatisticLine txt="Neutral: " value={neutral} />
   <StatisticLine txt="Bad: " value={bad} />
   <StatisticLine txt="Total: " value={sum} />
   <StatisticLine txt="Average: " value={dividend/sum} />
   <StatisticLine txt="Positive: " value={positive} percentage=" %"/>
  </table>
 )
}

const StatisticLine = ({txt,value,percentage}) => {
  return (
      <tbody>
    <tr>
      <td>{txt}</td><td>{value} {percentage}</td>
    </tr>
      </tbody>
  )
}

const App = () => {
  const header = 'Give feedback'
  const subHeader = 'Statistics: '
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    console.log('good clicked')
    setGood(good + 1)

  }

  const neutralClick = () => {
    console.log('neutral clicked')
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    console.log('bad clicked')
    setBad(bad + 1)
  }

  return (
    <div>
      <Header head={header}/>
      <Button click={goodClick} txt="Good" />
      <Button click={neutralClick} txt="Neutral" />
      <Button click={badClick} txt="Bad" />
      <SubHeader subHead={subHeader}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
