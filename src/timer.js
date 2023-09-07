import { useEffect } from 'react';

export const Timer = ({ tickHandler, timeRemaining }) => {
  useEffect(() => {
    const interval = setInterval(() => tickHandler(), 1000);
    return () => clearInterval(interval);
  }, [tickHandler]);

  return <div className='timer'>{timeRemaining}</div>;
};
