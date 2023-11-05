function StartScreen(props) {
  return (
    <div className="start">
      <h2>Welcome the the React Quiz</h2>
      <h4>Answer {props.num} questions to test your React mastery.</h4>
      <button className="btn btn-ui">Start Quiz</button>
    </div>
  );
}

export default StartScreen;
