export function Option({ question, onNext, handleAnswer, answer }) {
  return (
    <div className="options">
      {question.options.map((va, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''} ${
            answer !== null &&
            (i === question.correctOption ? 'correct' : 'wrong')
          }`}
          key={i}
          onClick={() => handleAnswer(i)}
          disabled={answer !== null}
        >
          {va}
        </button>
      ))}
    </div>
  );
}
