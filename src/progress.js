export const Progress = ({ answer, index, amount, score, totalScore }) => {
  return (
    <header className='progress'>
      <progress
        value={index + (answer === null ? 0 : 1)}
        max={amount}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/{amount}
      </p>
      <p>
        <strong>{score}</strong>/{totalScore}
      </p>
    </header>
  );
};
