import { useQuizz } from './context/QuizzContext';

function StartScreen() {
  const { dispatch, questions } = useQuizz();
  return (
    <div className="start">
      <h2>Welcome the the React Quiz</h2>
      <h4>Answer {questions?.length} questions to test your React mastery.</h4>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'active' })}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
