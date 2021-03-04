import React, { useState } from 'react';

interface Props {
  isStarted: Boolean;
}

export default function Timer({isStarted}: Props) {
  const [value, setValue] = useState(0);
   
  setTimeout(() => {
    setValue(value + 1);
  }, 1000);
  
  return <div className='header__timer'>{value}</div>;
}
