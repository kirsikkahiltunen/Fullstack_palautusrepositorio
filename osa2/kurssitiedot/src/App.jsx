const Header = (props) =>{
  return (
    <div>
      <h1>{props.course}</h1>
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
const Total = (props) =>{
  return (
    <div>
      <p>Number of exercises {props.parts[0]['exercises'] + props.parts[1]['exercises'] + props.parts[2]['exercises']}</p>
    </div>
  )
}
const Course = ({course: { name, parts }}) =>{
  return (
    <div>
      <Header course={name} />
      <Content parts={parts}/>
    </div>
  )
}
const App = () => {
  const course = {
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
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
