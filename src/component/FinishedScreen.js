import { useQuizz } from './context/QuizzContext';

function FinishedScreen() {
  const { points } = useQuizz();
  return (
    <>
      <p className="result">
        Congratulatoin you have finished all the questions
      </p>
      <p className="result">
        And your score is <strong>{points}</strong>
      </p>
    </>
  );
}

export default FinishedScreen;
