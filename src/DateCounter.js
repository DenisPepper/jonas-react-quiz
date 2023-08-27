import { useReducer, useState } from 'react';

const Actions = {
  decrement: { type: 'dec' },
  inccrement: { type: 'inc' },
  setCount: { type: 'set', payload: 0 },
};

function reducer(state, action) {
  console.log(state, action);
  if (action.type === Actions.decrement.type) return --state;
  if (action.type === Actions.inccrement.type) return ++state;
  if (action.type === Actions.setCount.type) return action.payload;
  return state;
}

function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, dispatch] = useReducer(reducer, 0);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch(Actions.decrement);
  };

  const inc = function () {
    dispatch(Actions.inccrement);
  };

  const defineCount = function (e) {
    dispatch({ ...Actions.setCount, payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch(Actions.setCount);
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
