export const NextButton = ({ answer, clickHandler, isLastQuestion }) => {
  if (answer === null) return null;

  return (
    <button className='btn btn-ui' onClick={clickHandler}>
      {!isLastQuestion ? 'Next' : 'Finish'}
    </button>
  );
};
