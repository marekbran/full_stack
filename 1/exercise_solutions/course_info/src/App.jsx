const Header = ({ course }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
};

const Content = ({ content }) => { 
  return (
    <div>
      {content.map(part => (
        <Part key={part.name} part={part}/>
      ))}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ content }) => {
  let total = content[0].exercises + content[1].exercises + content[2].exercises
  return <p>Number of exercises {total}</p>;
};




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
      <Header course={course.name} />
      <Content content={course.parts}/>
      <Total content={course.parts}/>
    </div>
  )
}

export default App