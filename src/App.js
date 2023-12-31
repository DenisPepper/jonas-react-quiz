import { useEffect, useReducer } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Loader } from './Loader';
import { Error } from './Error';
import { StartScreen } from './start-screen';
import { Question } from './question';
import { NextButton } from './next-button';
import { Progress } from './progress';
import { FinishScreen } from './finish-screen';
import { Timer } from './timer';
import { Footer } from './footer';
import { questions as data } from './data';

const TIME_INTERVAL = 10;

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
  finishQuiz: 'finishQuiz',
  tick: 'tick',
};

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  score: 0,
  highscore: 0,
  status: Status.loading,
  timeRemaining: null,
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
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: action.payload,
        timeRemaining: TIME_INTERVAL * state.questions.length,
      };
    case Action.finishQuiz:
      return {
        ...state,
        status: action.payload,
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
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
    case Action.tick:
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? Status.finished : state.status,
      };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [
    { score, questions, index, status, answer, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalScore = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  const isLastQuestion = index === questions.length - 1;

  useEffect(() => {
    dispatch({
      type: Action.dataRecived,
      payload: { questions: data, status: Status.ready },
    });
    /*fetch('http://localhost:8000/questions')
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
      );*/
  }, []);

  const handleStartClick = () => {
    dispatch({ type: Action.startQuiz, payload: Status.active });
  };

  const handleAnswerClick = (answer) => {
    dispatch({ type: Action.newAnswer, payload: answer });
  };

  const handleNextClick = () => {
    !isLastQuestion
      ? dispatch({ type: Action.nextQuestion })
      : dispatch({ type: Action.finishQuiz, payload: Status.finished });
  };

  const handleTick = () => {
    dispatch({ type: Action.tick });
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
              totalScore={totalScore}
            />
            <Question
              item={questions[index]}
              answer={answer}
              answerHandler={handleAnswerClick}
            />
            <Footer>
              <NextButton
                answer={answer}
                clickHandler={handleNextClick}
                isLastQuestion={isLastQuestion}
              />
              <Timer tickHandler={handleTick} timeRemaining={timeRemaining} />
            </Footer>
          </>
        )}
        {status === Status.finished && (
          <FinishScreen
            score={score}
            totalScore={totalScore}
            highscore={highscore}
            startHandler={handleStartClick}
          />
        )}
      </Main>
    </div>
  );
}
