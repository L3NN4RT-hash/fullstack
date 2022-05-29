import React from 'react'

const ShowNumbers = ({people}) => {
  const newList = people.filter(person => person.visible)
 return( newList.map(person => <div key={person.id}>
    {person.name} {person.number}
  </div>))
}

export default ShowNumbers