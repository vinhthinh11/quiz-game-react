function Progess({
  index,
  numQuestion,
  points = 0,
  totalPoints = 100,
  answer,
}) {
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
