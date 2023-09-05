import { Options } from './options';

export const Question = ({ item }) => {
  const { question, options, correctOption, points } = item;

  const handleClick = (evt) => {
    console.log(evt.target.textContent);
  };

  return (
    <div>
      <h4>{question}</h4>
      <div className='options'>
        <Options options={options} clickHandler={handleClick} />
      </div>
    </div>
  );
};
