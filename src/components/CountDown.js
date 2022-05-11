import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
const CountDown = (props) => {
  const [days, hours, minutes, seconds] = useCountdown(props.targetDate);

  //values here are set to the custom hook which are displayed in tailwinds css
  const countDays = {
    '--value': days,
  };
  const countHours = {
    '--value': hours,
  };
  const countMin = {
    '--value': minutes,
  };
  const countSec = {
    '--value': seconds,
  };
  return (
    <div className="flex gap-5">
      <div>
        <span className="countdown font-mono text-xl">
          <span style={countDays}></span>
        </span>
        days
      </div>
      <div>
        <span className="countdown font-mono text-xl">
          <span style={countHours}></span>
        </span>
        hours
      </div>
      <div>
        <span className="countdown font-mono text-xl">
          <span style={countMin}></span>
        </span>
        min
      </div>
      <div>
        <span className="countdown font-mono text-xl">
          <span style={countSec}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountDown;
