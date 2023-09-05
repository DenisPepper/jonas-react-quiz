import { Options } from './options';

export const Question = ({ item, answer, answerHandler }) => {
  const { question, options, correctOption, points } = item;

  return (
    <div>
      <h4>{question}</h4>
      <div className='options'>
        <Options options={options} answer={answer} correctAnswer={correctOption} clickHandler={answerHandler} />
      </div>
    </div>
  );
};
