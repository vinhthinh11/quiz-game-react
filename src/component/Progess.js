import { useQuizz } from './context/QuizzContext';

function Progess() {
  const { index, questions, points, totalPoints, answer } = useQuizz();
  const numQuestion = questions.length;
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestion}
      </p>
      <p>
        <strong>
          {points} / {totalPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progess;
