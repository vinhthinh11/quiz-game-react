import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizzContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieving':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'active':
      return {
        ...state,
        status: 'active',
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'newAnswer':
      const correctAnswer = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          correctAnswer.correctOption === action.payload
            ? state.points + correctAnswer.points
            : state.points,
      };
    case 'finished':
      return { ...state, status: 'finished', answer: null };
    case 'reset':
      return { ...initialState, status: 'ready', questions: state.questions };
    case 'tick': {
      return {
        ...state,
        timeToAnswer: state.timeToAnswer - 1000,
        status: state.timeToAnswer === 0 ? 'finished' : state.status,
      };
    }
    default:
      throw new Error('Acton is unknown');
  }
}
const initialState = {
  questions: [],
  // loading, error ,error,ready, finished
  status: 'loading',
  index: 0, // the index of the current question
  answer: null,
  points: 0,
  timeToAnswer: 8 * 60 * 1000,
};

function QuizzProvider({ children }) {
  const [{ status, questions, index, answer, points, timeToAnswer }, dispatch] =
    useReducer(reducer, initialState);
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({ type: 'dataRecieving', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, []);

  const totalPoints = questions.reduce((acc, val) => val.points + acc, 0);
  return (
    <QuizzContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        timeToAnswer,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
}
function useQuizz() {
  const context = useContext(QuizzContext);
  if (!context) throw new Error('Context must use inside provider');
  return context;
}

export { QuizzProvider, useQuizz };
