import { useEffect, useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Loader } from './Loader';
import { Error } from './Error';
import { StartScreen } from './start-screen';
import { Question } from './question';

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
  startQuiz: 'startQuiz',
  newAnswer: 'newAnswer',
};

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  status: Status.loading,
};

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
    case Action.startQuiz:
      return {
        ...state,
        status: action.payload,
      };
    case Action.newAnswer:
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [{ questions, index, status, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

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

  const handleStartClick = () => {
    dispatch({ type: Action.startQuiz, payload: Status.active });
  };

  const handleAnswerClick = (answer) => {
    dispatch({ type: Action.newAnswer, payload: answer });
  };

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === Status.loading && <Loader />}
        {status === Status.error && <Error />}
        {status === Status.ready && (
          <StartScreen
            amount={questions.length}
            startHandler={handleStartClick}
          />
        )}
        {status === Status.active && (
          <Question item={questions[index]} answer={answer} answerHandler={handleAnswerClick} />
        )}
      </Main>
    </div>
  );
}
