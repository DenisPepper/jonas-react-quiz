import { useEffect, useReducer } from 'react';
import Header from './Header';
import { Main } from './Main';

const Status = {
  loading: 'loading',
  error: 'error',
  ready: 'ready',
  active: 'active',
  finished: 'finished',
};

const Action = {
  dataRecived: 'dataRecived',
};

const initialState = { questions: [], status: Status.loading };

const reducer = (state, action) => {
  switch (action.type) {
    case Action.dataRecived:
      return {
        ...state,
        questions: action.payload.questions,
        status: action.payload.status,
      };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: Action.dataRecived,
          payload: { questions: data, status: Status.ready },
        })
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
