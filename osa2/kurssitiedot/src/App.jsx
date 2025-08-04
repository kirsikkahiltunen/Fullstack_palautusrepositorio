const Header = (props) =>{
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}
const Part = (props) =>{
  console.log(props)
  return (
    <div>
      <p>{props.part['name']} {props.part['exercises']}</p>
    </div>
  )
}
const Content = (props) =>{
  console.log(props.parts)
  return (
    props.parts.map(part =>
      <div key={part.id}>
        <Part part={part}/>
      </div>
    )
  )
}
const Total = (props) => {
  return (
    <div>
      <b>total of {props.parts.reduce((sum, p) => sum + p.exercises, 0)} exercises</b>
    </div>
  )
}
const Courses = (props) => {
  console.log(props.courses)
  return (
    props.courses.map(course =>
      <div key={course.id}>
        <Course course={course}/>
      </div>
    )
  )
}
const Course = ({course: { name, parts }}) =>{
  return (
    <div>
      <Header course={name} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
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
    }
  ]


  return (
    <div>
      <h1>Web development courses</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App
