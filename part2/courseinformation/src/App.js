import Course from './components/Course'

const MainHeader = () => <h1>Web development curriculum</h1>

const App = () => {
  const course = [
    {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      },
      {
        id: 4,
        name: 'Extra',
        exercises: 3
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  },
  {
    name: 'Arbitrary number of courses',
    id: 3,
    parts: [
      {
        name: 'This works',
        exercises: 6,
        id: 1
      },
      {
        name: 'Wonderfull',
        exercises: 7,
        id: 2
      }
    ]
  }
]


  return (
    <div>
      <MainHeader />
      {course.map(cs => <div key={cs.id}> <Course course={cs} /> </div>
)}
  </div>
  )
}

export default App
