export const FinishScreen = ({ score, totalScore }) => {
  return (
    <p className='result'>
      You scored <strong>{score}</strong> out of {totalScore} (
      {Math.ceil(score / totalScore)})%
    </p>
  );
};
