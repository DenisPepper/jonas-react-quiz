import { useReducer, useState } from 'react';

const counterActions = {
  decrement: { type: 'dec' },
  inccrement: { type: 'inc' },
  setCount: { type: 'set', payload: 0 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case counterActions.decrement.type:
      return --state;
    case counterActions.inccrement.type:
      return ++state;
    case counterActions.setCount.type:
      return action.payload;
    default:
      throw new Error('unknown action');
  }
};

function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, dispatch] = useReducer(reducer, 0);

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
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch(counterActions.setCount);
    // setCount(0);
    setStep(1);
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
