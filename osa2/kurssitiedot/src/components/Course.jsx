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
  const Course = ({course: { name, parts }}) =>{
    return (
      <div>
        <Header course={name} />
        <Content parts={parts}/>
        <Total parts={parts}/>
      </div>
    )
  }

  export default Course