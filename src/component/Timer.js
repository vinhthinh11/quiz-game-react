import { useEffect } from 'react';
import { useQuizz } from './context/QuizzContext';
function Timer() {
  const { dispatch, timeToAnswer } = useQuizz();
  //follow jonas, let make useEffect at here, though I think that we can manage it at app component 😕😕
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {Math.floor(timeToAnswer / 60000)
        .toString()
        .padStart(2, '0')}
      :{((timeToAnswer / 1000) % 60).toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;
