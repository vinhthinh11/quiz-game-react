import { useQuizz } from './context/QuizzContext';

export function Option() {
  const { questions, answer, dispatch, index } = useQuizz();
  return (
    <div className="options">
      {questions[index].options.map((va, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''} ${
            answer !== null &&
            (i === questions[index].correctOption ? 'correct' : 'wrong')
          }`}
          key={i}
          onClick={() => dispatch({ type: 'newAnswer', payload: +i })}
          disabled={answer !== null}
        >
          {va}
        </button>
      ))}
    </div>
  );
}
