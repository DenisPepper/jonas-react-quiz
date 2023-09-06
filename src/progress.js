export const Progress = ({ current, amount, score, totalScore }) => {
  return (
    <header className='progress'>
      <p>
        Question <strong>{current}</strong>/{amount}
      </p>
      <p>
        <strong>{score}</strong>/{totalScore}
      </p>
    </header>
  );
};
