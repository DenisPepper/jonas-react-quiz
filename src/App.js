import { useEffect, useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Loader } from './Loader';
import { Error } from './Error';
import { StartScreen } from './start-screen';

const Status = {
  loading: 'loading',
  error: 'error',
  ready: 'ready',
  active: 'active',
  finished: 'finished',
};

const Action = {
  dataRecived: 'dataRecived',
  dataFaild: 'dataFailed',
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
    case Action.dataFaild:
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [{ question, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Server response are not ok');
      })
      .then((data) =>
        dispatch({
          type: Action.dataRecived,
          payload: { questions: data, status: Status.ready },
        })
      )
      .catch((err) =>
        dispatch({
          type: Action.dataFaild,
          payload: { questions: [], status: Status.error },
        })
      );
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === Status.loading && <Loader />}
        {status === Status.error && <Error />}
        {status === Status.ready && <StartScreen />}
      </Main>
    </div>
  );
}
