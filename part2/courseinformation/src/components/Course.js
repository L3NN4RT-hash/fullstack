import React from 'react'

const Header = (props) => {
    console.log(props)
    return(
      <div>
        <h2>{props.head}</h2>
      </div>
    )
  }
  
  const Total = ({array}) => {
    const total = 
    array.reduce((sum, array) => sum + array.exercises, 0)
    console.log(total)
    return (
      <div>
        Total number of exercises: {total}
      </div>
    )
  }
  
  const Content = ({array}) => {
    console.log('Content works')
    return (
      array.map(parts => <p key={parts.id}>{parts.name} {parts.exercises} </p>)
    )
  }
  
  const Course = ({course}) => {
    console.log('this works')
    console.log(course)
    const courseParts = course.parts
    return(
      <div>
    <Header head={course.name}/>
    <Content array={courseParts} />
    <Total array={courseParts} />
        </div>
    )
  }

export default Course