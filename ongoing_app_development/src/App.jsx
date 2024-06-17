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
  let total = 0;
  for (const part of content) {
    total += part.exercises;
  }
  return <p>Number of exercises {total}</p>;
};




const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {
      name: 'Fundamentals of React',
      exercises: 10},
    {
      name: 'Using props to pass data',
      exercises: 7},
    {
      name: 'State of a component',
      exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content}/>
      <Total content={content}/>
    </div>
  )
}

export default App