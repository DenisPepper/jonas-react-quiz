import { useEffect } from 'react';

export const Timer = ({ tickHandler, timeRemaining: seconds }) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  useEffect(() => {
    const interval = setInterval(() => tickHandler(), 1000);
    return () => clearInterval(interval);
  }, [tickHandler]);

  return (
    <div className='timer'>
      {m < 10 ? '0' : ''}
      {m}:{s < 10 ? '0' : ''}
      {s}
    </div>
  );
};
