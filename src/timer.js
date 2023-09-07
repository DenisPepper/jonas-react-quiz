import { useEffect } from 'react';

export const Timer = ({ tickHandler, timeRemaining }) => {
  useEffect(() => {
    setInterval(() => tickHandler(), 1000);
  }, [tickHandler]);

  return <div className='timer'>{timeRemaining}</div>;
};
