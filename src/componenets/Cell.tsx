import React, { useState } from 'react';
import { ReactComponent as Mine } from '../assets/mine.svg'

interface Props {
  data: number
}

export default function Cell(props: Props) {
  let [visible, setVisibility] = useState(false)
  
  const content = (value: number) => {
    if (value === -1) return <Mine />;
    else if(value === 0) return <p></p>
    return <p>{value}</p>;
  };

  const clickHandler = () => {
    setVisibility(true)
  }

  return (
    <div className={`board__cell ${visible?'cell-visited':''}`} onClick={clickHandler}>
      {content(props.data)}
    </div>
  );
}
