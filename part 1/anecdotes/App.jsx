import { useState } from "react";

const Anaecdote = ({ text, votes }) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const SelectRanQuote = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const Vote = (quote) => {
    const newPoints = [...points];
    newPoints[quote] += 1;
    console.log(newPoints);
    setPoints(newPoints);
  };

  return (
    <div>
      <h1>Anaecdote of the day</h1>
      <Anaecdote text={anecdotes[selected]} votes={points[selected]} />
      <button onClick={() => Vote(selected)}>vote</button>
      <button onClick={SelectRanQuote}>next anecdote</button>
      <h1>Anaecdote with most votes</h1>
      <Anaecdote
        text={anecdotes[points.indexOf(Math.max(...points))]}
        votes={Math.max(...points)}
      />
    </div>
  );
};

export default App;
