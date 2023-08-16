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
      <b>
        total of{" "}
        {props.exercises.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </b>
    </p>
  );
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

export default Course;
