import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState('Counter');
  const myRef = useRef(null);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive && type === 'Counter') {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } 
    if (isActive && type === 'Countdown') {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } 
    if (!isActive && seconds !== 0 && type === 'Counter') {
      clearInterval(interval);
    }
    if (seconds === 0 && type === 'Countdown') {
      reset();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, type]);

  function changeType() {
    if(type === 'Counter') setType('Countdown')
    if(type === 'Countdown') setType('Counter')
  }

  function addSeconds() {
    // e.preventDefault()
    let ref = myRef.current.value
    setSeconds(ref)
  }

  return (
    <div className="app">
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={changeType}>
          {type}
      </button>
      {type === 'Countdown' && <input type="number" onChange={addSeconds} ref={myRef} name="minutes" placeholder="Enter Minutes" autoComplete="off"/>}
    </div>
  );
};

export default Timer;