import { useReducer } from 'react';

function reducer(state, action) {
  // destruction action
  const { count, step } = state;
  const { type, payload } = action;
  switch (type) {
    case 'inc':
      return { count: Number(count) + Number(step), step };
    case 'des':
      return { count: Number(count) - Number(step), step };
    case 'setCount':
      return { count: payload, step };
    case 'step':
      return { count, step: payload };
    case 'reset':
      return initialState;
    default:
      return initialState;
  }
}
const initialState = { count: 0, step: 1 };

function DateCounter() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + +count); //count thay doi --> state thay doi --> render lai Date component

  const dec = function () {
    dispatch({ type: 'des', payload: step });
  };

  const inc = function () {
    dispatch({ type: 'inc', payload: step });
  };

  const defineCount = function (e) {
    dispatch({
      type: 'setCount',
      payload: e.target.value,
    }); //de dau cong nay ==> convert number ==> value NaN
  };

  const defineStep = function (e) {
    dispatch({ type: 'step', payload: +e.target.value });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
