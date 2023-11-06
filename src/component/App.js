import { useEffect, useReducer } from 'react';
import Loader from './Loader.js';
import NextButton from './NextButton.js';
import Error from './Error.js';
import Questions from './Questions.js';
import Header from './Header';
import Main from './Main';
import Progess from './Progess.js';
import FinishedScreen from './FinishedScreen.js';
import Footer from './Footer.js';
import StartScreen from './StartScreen.js';
import Timer from './Timer.js';
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
    case 'selectAnswer':
      return {
        ...state,
        index: state.index++,
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
  timeToAnswer: 8 * 1000,
};
export default function App() {
  const [{ status, questions, index, answer, points, timeToAnswer }, dispatch] =
    useReducer(reducer, initialState);
  const totalPoints = questions.reduce((acc, val) => val.points + acc, 0);
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
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            {...{
              num: questions.length,
              setActive: () => {
                dispatch({ type: 'active' });
              },
            }}
          />
        )}
        {status === 'active' && (
          <>
            <Progess
              index={index}
              numQuestion={questions.length}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              handleAnswer={i => dispatch({ type: 'newAnswer', payload: +i })}
              answer={answer}
            />
          </>
        )}
        <Footer>
          {status === 'active' && (
            <Timer dispatch={dispatch} timeToAnswer={timeToAnswer} />
          )}
          {answer !== null && index < questions.length - 1 && (
            <NextButton
              handleSelectAnwer={() => dispatch({ type: 'selectAnswer' })}
            >
              Next question
            </NextButton>
          )}
          {answer !== null && index === questions.length - 1 && (
            <NextButton
              handleSelectAnwer={() => dispatch({ type: 'finished' })}
            >
              Finish
            </NextButton>
          )}
          {status === 'finished' && (
            <>
              <FinishedScreen points={points} totalPoints={totalPoints} />
              <NextButton handleSelectAnwer={() => dispatch({ type: 'reset' })}>
                Reset
              </NextButton>
            </>
          )}
        </Footer>
      </Main>
    </div>
  );
}
