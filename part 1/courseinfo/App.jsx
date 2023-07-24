function Header(props) {
  return <h1>{props.course}</h1>;
}

function Part(props) {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
}

function Content(props) {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part.name} exercise={part.exercises} key={part.name} />
      ))}
    </div>
  );
}

function Total(props) {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  );
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

export default App;
