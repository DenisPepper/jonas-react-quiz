export const Options = ({ options, clickHandler, answer, correctAnswer }) => {
  const hasAnswered = answer !== null;

  return (
    <>
      {options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered ? (index === correctAnswer ? 'correct' : 'wrong') : ''
          }`}
          onClick={() => clickHandler(index)}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </>
  );
};
