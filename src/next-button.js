export const NextButton = ({ answer, clickHandler }) => {
  if (answer === null) return null;

  return (
    <button className='btn btn-ui' onClick={clickHandler}>
      Next question
    </button>
  );
};
