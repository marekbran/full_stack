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
    let total = content.reduce((sum, part)  => sum + part.exercises, 0) 
    return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />
        <Content content={course.parts}/>
        <Total content={course.parts}/>
        </div>
    )
}

export default Course