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
      {courses.map(course =>
        <div>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      )
      }


    </div>
  )


}

const Header = (props) => {

  return <h1>{props.course.name}</h1>
}

const Total = (props) => {

  const init = 0;
  const sum = props.course.parts.reduce(
    (total, part) => total + part.exercises,
    init
  );

  return <p>Number of exercises {sum}</p>
}



const Content = (props) => {
  return (
    <div>
      <ul>
        {props.course.parts.map(part =>
          <li key={part.name}> <Part name={part.name} exercises={part.exercises} /></li>
        )
        }
      </ul>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.name} {props.exercises}
    </div>
  )
}

export default App