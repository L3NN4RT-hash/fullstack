import { useState } from 'react'

const Head = ({header}) => <h1>{header}</h1>

const rng = (min,max) => Math.floor(Math.random()*(max-min+1)+min)
  
const Button = ({click,txt}) => {
  return (<button onClick={click}>
    {txt}
  </button>
  )
}

const Display = ({number,list}) => {
  console.log(number)
  return(
    list[number]
  )
}

const App = () => {
  const header1 = 'Anecdote of the day'
  const header2 = 'Anecdote with most votes'
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [votes, setVotes] = 
  useState(new Uint8Array(7))

  var largest = 0
  var arrayPosition = 0

  for (var i = 0; i < anecdotes.length; i++) {
    if (largest < votes[i]) {
      largest = votes[i]
      arrayPosition = i
    }
  }

  console.log('position', arrayPosition)
  console.log('number', largest)
  
  const [selected, setSelected] = useState(0)

  const handleClick = () => 
    setSelected(rng(0,anecdotes.length - 1))
  
  const handleVote = () => {
    const copy ={
      ...votes
    }
    copy[selected]+=1
    console.log(copy)

    setVotes(copy)
  }
  
  

  return (
    <div>
      <Head header={header1} />
      <p>
      <Display number={selected} list={anecdotes} />
      </p>
      <p>
      Number of votes: <Display number={selected} list={votes} />
      </p>
      <Button click={handleClick} txt= {'Show anecdote'} />
      <Button click={handleVote} txt={'Vote'} />
      <Head header={header2} />
      <Display number={arrayPosition} list={anecdotes} />
      <p>
        Number of votes: <Display number={arrayPosition} list={votes} />
      </p>
    </div>
  )
}

export default App
