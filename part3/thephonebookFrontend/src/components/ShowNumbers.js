import React from 'react'


const ShowNumbers = ({person,deleteNumber}) => {

 if (person.visible === true) {
   return (
     <div>
       {person.name} {person.number}
       <button onClick={deleteNumber}>Delete</button>
     </div>
   )
   
 }
}

export default ShowNumbers