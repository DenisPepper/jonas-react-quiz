import { useReducer } from 'react';

const INITIAL_STATE = { count: 0, step: 1 };

const counterActions = {
  decrement: { type: 'DEC' },
  inccrement: { type: 'INC' },
  setCount: { type: 'SET_COUNT', payload: 0 },
  setStep: { type: 'SET_STEP', payload: 0 },
  reset: { type: 'RESET', payload: INITIAL_STATE },
};

const reducer = (state, action) => {
  switch (action.type) {
    case counterActions.decrement.type:
      return { ...state, count: state.count - state.step };
    case counterActions.inccrement.type:
      return { ...state, count: state.count + state.step };
    case counterActions.setCount.type:
      return { ...state, count: action.payload };
    case counterActions.setStep.type:
      return { ...state, step: action.payload };
    case counterActions.reset.type:
      return { ...action.payload };
    default:
      throw new Error('unknown action');
  }
};

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, INITIAL_STATE);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch(counterActions.decrement);
  };

  const inc = function () {
    dispatch(counterActions.inccrement);
  };

  const defineCount = function (e) {
    dispatch({ ...counterActions.setCount, payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ ...counterActions.setStep, payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch(counterActions.reset);
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
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
