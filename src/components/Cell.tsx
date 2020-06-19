import React from 'react';

interface props {
  color: string
}

const Cell = (props: props) => {

  return (
    <div style={
      {
        width: '20px', 
        height: '20px', 
        backgroundColor: props.color,
        display: 'inline-block',
        border: '1px solid black'
      }
      }>

    </div>
  )
}

export default Cell;