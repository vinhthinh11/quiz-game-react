function FinishedScreen({ points, totalPoints }) {
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
