import { Option } from './Option';
function Questions({ questions, handleSelectAnwer, handleAnswer, answer }) {
  return (
    <div>
      <h4 className=""> {questions.question}</h4>
      <Option
        question={questions}
        onNext={handleSelectAnwer}
        handleAnswer={handleAnswer}
        answer={answer}
      />
    </div>
  );
}

export default Questions;
