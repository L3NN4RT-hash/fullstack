const Header = (props) => {
  console.log(props)
  return(
    <div>
      <h1>{props.head}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
      <p>
        {props.part}, number of exercises = {props.int}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.list[0].name} int={props.list[0].exercises} />
      <Part part={props.list[1].name} int={props.list[1].exercises} />
      <Part part={props.list[2].name} int={props.list[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Total number of exercises = {props.list[0].exercises + props.list[1].exercises + props.list[2].exercises}</p>
    </div>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
  ] 
  }

  return (
    <div>
      <Header head={course.name}/>
      <Content list={course.parts}/>
      <Total list={course.parts} />
      {counter}
    </div>
  )
}

export default App
