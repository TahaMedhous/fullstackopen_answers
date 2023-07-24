import { useState } from "react";
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>

      {props.all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticLine text={"good"} value={props.good} />
              <StatisticLine text={"neutral"} value={props.neutral} />
              <StatisticLine text={"bad"} value={props.bad} />
              <StatisticLine text={"all"} value={props.all} />
              <StatisticLine text={"average"} value={props.average} />
              <StatisticLine
                text={"positive"}
                value={`${props.pourcentage} %`}
              />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

const Button = ({ FunctToRun, text }) => {
  return <button onClick={FunctToRun}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const HandleGoodFeed = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setAll(updatedGood + bad + neutral);
  };

  const HandleBadFeed = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(updatedBad + good + neutral);
  };

  const HandleNeutralFeed = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setAll(updatedNeutral + good + bad);
  };

  const Total = (good * 1 + neutral * 0 + bad * -1) / all;
  const Pourcentage = (good * 100) / all;

  return (
    <div>
      <h1>give feedback</h1>
      <Button FunctToRun={HandleGoodFeed} text={"good"} />
      <Button FunctToRun={HandleNeutralFeed} text={"neutral"} />
      <Button FunctToRun={HandleBadFeed} text={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={Total}
        pourcentage={Pourcentage}
      />
    </div>
  );
};
export default App;
