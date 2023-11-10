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
import { useQuizz } from './context/QuizzContext.js';

export default function App() {
  const { status, questions, answer, index, dispatch } = useQuizz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progess />
            <Questions />
          </>
        )}
        <Footer>
          {status === 'active' && <Timer />}
          {answer !== null && index < questions.length - 1 && (
            <NextButton action={() => dispatch({ type: 'nextQuestion' })}>
              Next question
            </NextButton>
          )}
          {answer !== null && index === questions.length - 1 && (
            <NextButton action={() => dispatch({ type: 'finished' })}>
              Finish
            </NextButton>
          )}
          {status === 'finished' && (
            <>
              <FinishedScreen />
              <NextButton action={() => dispatch({ type: 'reset' })}>
                Reset
              </NextButton>
            </>
          )}
        </Footer>
      </Main>
    </div>
  );
}
