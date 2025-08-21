const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => {   
    return (
      <div>
        {props.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)


const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p style={{fontWeight: 'bold'}} >total of {total} exercises</p>
  )
}

const SingelCourse = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Course = ({ courses }) => {
    
  return (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => (
          <SingelCourse key={course.id} course={course} />
        ))}
    </div>
  )
}

export default Course