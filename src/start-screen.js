export const StartScreen = ({ amount }) => {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{amount} questions to test your react mastery</h3>
      <button>Let's start</button>
    </div>
  );
};
