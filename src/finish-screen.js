export const FinishScreen = ({
  score,
  totalScore,
  highscore,
  startHandler,
}) => {
  const percents = Math.ceil((score / totalScore) * 100);

  let emoji;
  if (percents === 100) emoji = '😎';
  if (percents < 100 && percents >= 80) emoji = '😊';
  if (percents < 80 && percents >= 50) emoji = '🙂';
  if (percents < 50 && percents >= 25) emoji = '🙃';
  if (percents < 25) emoji = '😣';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span>
        You scored <strong>{score}</strong> out of {totalScore} ({percents})%
      </p>
      <p className='highscore'>Highscore: {highscore} points</p>
      <button className='btn btn-ui' onClick={startHandler}>
        Restart quiz
      </button>
    </>
  );
};
