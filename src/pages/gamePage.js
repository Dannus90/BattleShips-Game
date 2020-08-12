import React, { useState, useEffect } from "react";
import "./gamePage.styles.scss";
import produce from "immer";

//GameBoard size
const rows = 14;
const columns = 14;

//Generate Gameboard
const createGameBoard = () => {
    let rowArray = [];
    for (let i = 0; i < rows; i++) {
        rowArray.push(Array.from(Array(columns), () => 0));
    }

    return rowArray;
};

// Used for checking if a square has been clicked or not.
const numbersArray = [];

let gridArray = createGameBoard();

const GamePage = () => {
    // const [grid, setGrid] = useState(createGameBoard());
    const [score, setScore] = useState(0);
    const [numberOfTries, setNumberOfTries] = useState(80);

    console.log(gridArray);

    //Generate one random 5 point ship. Either Vertical or horizontal. Keeps it on the board
    const generateFiveShip = (number) => {
        
        let randomDirection = Math.ceil(Math.random() * 2);
        let randomStartGrid = Math.floor(Math.random() * gridArray.length);
        let randomNumberGrid = Math.floor(Math.random() * gridArray.length);
        if(randomDirection === 1 && randomNumberGrid + 1 <= gridArray.length && randomNumberGrid + 2 <= gridArray.length && randomNumberGrid + 3 <= gridArray.length && randomNumberGrid + 4 <= gridArray.length){
        gridArray = produce(gridArray, (gridcopy) =>
        {
            
            gridcopy[randomStartGrid][randomNumberGrid] = 1;
            gridcopy[randomStartGrid][randomNumberGrid +1] = 1;
            gridcopy[randomStartGrid][randomNumberGrid +2] = 1;
            gridcopy[randomStartGrid][randomNumberGrid +3] = 1;
            gridcopy[randomStartGrid][randomNumberGrid +4] = 1;
        })
        } else if(randomDirection === 2 && randomStartGrid + 1 <= gridArray.length && randomStartGrid + 2 <= gridArray.length && randomStartGrid + 3 <= gridArray.length && randomStartGrid + 4 <= gridArray.length) {
            gridArray = produce(gridArray, (gridcopy) =>
        {
            
            gridcopy[randomStartGrid][randomNumberGrid] = 1;
            gridcopy[randomStartGrid +1][randomNumberGrid] = 1;
            gridcopy[randomStartGrid +2][randomNumberGrid] = 1;
            gridcopy[randomStartGrid +3][randomNumberGrid] = 1;
            gridcopy[randomStartGrid +4][randomNumberGrid] = 1;
        })
        } else {
            generateFiveShip();
        }
        

        console.log(gridArray[randomStartGrid][randomNumberGrid]);
        console.log(gridArray)
    };

    //Random ships at start
    useEffect(() => {
        generateRandomShips();
        generateFiveShip(2);
    }, []);

    //Function for generating random ships
    const generateRandomShips = () => {
        gridArray = produce(gridArray, (gridcopy) => {
            for (let i = 0; i < gridArray.length; i++) {
                for (let j = 0; j < rows; j++) {
                    gridcopy[i][j] = 0;
                    // gridcopy[i][j] = Math.round(Math.random() * 1);
                }
            }
        });
        // setGrid(newGrid);
    };

    //Making sure we can only click a box once and the logic connected to it.
    const fillBox = (e, number) => {
        if (numbersArray.includes(e.target.dataset.type)) {
            return;
        }

        if (number) {
            e.target.classList.add("shipColumn");
            setScore((score) => score + 1);
            setNumberOfTries((numberOfTries) => numberOfTries - 1);
            numbersArray.push(e.target.dataset.type);
        } else if (!number) {
            e.target.classList.add("emptyColumn");
            setNumberOfTries((numberOfTries) => numberOfTries - 1);
            numbersArray.push(e.target.dataset.type);
        }
    };
    return (
        <div className="container">
            <div
                className="gameArea"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 50px)`,
                }}
            >
                {/* SETTING ALL INDIVIDUAL ITEMS! */}
                {gridArray.map((row, rowIndex) => {
                    return row.map((col, colIndex) => {
                        return (
                            <div
                                data-type={
                                    rowIndex.toString() + colIndex.toString()
                                }
                                key={`${rowIndex}-${colIndex}`}
                                onClick={(e) => {
                                    fillBox(e, gridArray[rowIndex][colIndex]);
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    border: "solid 1px black",
                                }}
                            />
                        );
                    });
                })}
            </div>
            <div>Score: {score}</div>
            <div>Number of tries left: {numberOfTries}</div>
        </div>
    );
};

export default GamePage;
