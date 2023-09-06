export const NextButton = ({ answer, clickHandler }) => {
  return (
    <button onClick={clickHandler} disabled={answer === null}>
      Next question
    </button>
  );
};
