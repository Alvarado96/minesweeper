import React, { useEffect, useState } from 'react'
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './Board.css';
import Cell from './Cell';

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount ] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);

    // ComponentDidMount
    useEffect(() => {
        // Creating a board
        function freshBoard() {
            const newBoard = createBoard(10, 10, 10);
            setNonMineCount(10*10 - 10);
            setMineLocations(newBoard.mineLocation);
            setGrid(newBoard.board);
        }
        
        // calling the function
        freshBoard();
    },[])

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) =>{
        // to not have drop down on right click
        e.preventDefault();
        // Deep copy of a state
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y])
        newGrid[x][y].flagged = true;
        console.log("Right Click");
        setGrid(newGrid);
    }

    // Reveal Cell
    const revealCell = (x,y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value === 'X'){
            alert("mine found");
            console.log(mineLocations);
            for(let i=0; i<mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount)
        }
    }

    // Once you finish will all ten blocks in a row
    // Go to the next row
    return (
        <>
            {grid.map((row, index1) => {
                return (
                    <div className="row" key={index1}>
                        {row.map((block, index2) => {
                            return (
                                <div key={index2} className="block-style">
                                    <Cell 
                                        details={block} 
                                        updateFlag={updateFlag}
                                        revealCell={revealCell}
                                    />
                                </div>)
                        })}
                    </div>
                )
            })}
        </>
    )
}

export default Board;