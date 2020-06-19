import React, {useState, useEffect, useRef} from 'react';
import Cell from './Cell';

interface props {
  cells: Array<Array<number>>
  rows: number
  columns: number
  isPlaying: boolean
}

const Grid = ({cells, rows, columns, isPlaying}: props) => {
  const [newCells, setNewCells] = useState<Array<Array<number>>>([]);
  const copyCells = cells;
  let interval = useRef<any>();
  

  useEffect(() => {
    setNewCells([...copyCells]);
  }, [copyCells])

  useEffect(() => {
    if (isPlaying){
      interval.current = window.setInterval(() => {
        setNewCells([...copyCells]);
      }, 1000);
    } else {
        clearInterval(interval.current)
    }
  },[isPlaying])

  const getColor = (i:number, j:number): string => {
    let value;
    //if (initial) value = newCells[i][j]
    //else {
      value = processGrid(i, j);
      copyCells[i][j] = value;
    //}
    switch(value) {
      case 0:
        return '#a3a3a3'
      case 1: 
        return '#5daaff'
      case 2: 
        return '#2cb48a'
      default:
        return ''
    }
  }

  const processGrid = (i:number, j:number): number => {
    let neighbors: number[] = []
    if (i>0){
      if (j>0) 
      neighbors.push(cells[i-1][j-1]);
      neighbors.push(cells[i-1][j]);
      if (j < columns) 
      neighbors.push(cells[i-1][j+1]);
    }
    
    if (j>0)
    neighbors.push(cells[i][j-1]);
    if (j < columns) 
    neighbors.push(cells[i][j+1]);

    if (i<rows-1) {
      if (j>0) 
      neighbors.push(cells[i+1][j-1]);
      neighbors.push(cells[i+1][j]);
      if (j < columns) 
      neighbors.push(cells[i+1][j+1]);
    }
    
    const happy = neighbors.filter((item: number) => item===2);
    const sad = neighbors.filter((item: number) => item===1);
    if (cells[i][j] === 0 && happy.length === 3) {
      return 2
    }
    if (cells[i][j] === 0 && sad.length === 3) {
      return 1
    }
    if (cells[i][j] === 0 && sad.length === 3) {
      return 1
    }
    if (cells[i][j] === 0 && sad.length === 2 && happy.length ===1) {
      return 1
    }
    if (cells[i][j] === 0 && sad.length === 1 && happy.length ===2) {
      return 2
    }
    if ((cells[i][j] === 1 || cells[i][j] === 2) && ((happy.length === 2 || happy.length===3) || (sad.length === 2 || sad.length===3))){
      return cells[i][j];
    } else {
      return 0;
    }
  }

  return (
    <div>
      {newCells.map((row: Array<number>, i: number) => {
        return (
          <div key={i}>
            {row.map((cell: number, j: number) => <Cell key={j} color={getColor(i,j)}/>)}
          </div>
        )
      })}
    </div>
  )

}

export default Grid;