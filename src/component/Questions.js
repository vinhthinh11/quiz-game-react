import { Option } from './Option';
import { useQuizz } from './context/QuizzContext';
function Questions() {
  const { questions, index } = useQuizz();
  return (
    <div>
      <h4 className=""> {questions[index].question}</h4>
      <Option />
    </div>
  );
}

export default Questions;
