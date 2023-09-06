import { useEffect, useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Loader } from './Loader';
import { Error } from './Error';
import { StartScreen } from './start-screen';
import { Question } from './question';
import { NextButton } from './next-button';
import { Progress } from './progress';

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
  nextQuestion: 'nextQuestion',
};

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  score: 0,
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
      const question = state.questions[state.index];
      const score =
        question.correctOption === action.payload
          ? state.score + question.points
          : state.score;

      return {
        ...state,
        answer: action.payload,
        score,
      };
    case Action.nextQuestion:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [{ score, questions, index, status, answer }, dispatch] = useReducer(
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

  const handleNextClick = () => {
    dispatch({ type: Action.nextQuestion });
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
          <>
            <Progress
              answer={answer}
              index={index}
              amount={questions.length}
              score={score}
              totalScore={questions.reduce(
                (acc, question) => acc + question.points,
                0
              )}
            />
            <Question
              item={questions[index]}
              answer={answer}
              answerHandler={handleAnswerClick}
            />
            <NextButton answer={answer} clickHandler={handleNextClick} />
          </>
        )}
      </Main>
    </div>
  );
}
