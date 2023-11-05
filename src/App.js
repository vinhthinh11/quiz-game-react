import { useEffect, useReducer } from 'react';
import Loader from './Loader.js';
import Error from './Error.js';
import start from './StartScreen.js';
import Header from './Header';
import Main from './Main';
import StartScreen from './StartScreen.js';
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
    case 'ready':
      return {
        ...state,
        status: 'ready',
      };
    case 'finished':
      return {
        ...state,
        status: 'finished',
      };
    default:
      throw new Error('Acton is unknown');
  }
}
const initialState = {
  questions: [],
  // loading, error ,error,ready, finished
  status: 'loading',
  option: [],
};
export default function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);
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
        {status === 'ready' && <StartScreen {...{ num: questions.length }} />}
      </Main>
    </div>
  );
}
