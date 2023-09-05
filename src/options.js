export const Options = ({ options, clickHandler }) => {
  return (
    <>
      {options.map((option) => (
        <button key={option} className='btn btn-option' onClick={clickHandler}>
          {option}
        </button>
      ))}
    </>
  );
};
