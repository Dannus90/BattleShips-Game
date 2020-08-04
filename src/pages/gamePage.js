import React, { useState, useEffect } from "react";
import "./gamePage.styles.scss";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

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

const GamePage = () => {
    const [grid, setGrid] = useState(createGameBoard());
    const [score, setScore] = useState(0);
    const [numberOfTries, setNumberOfTries] = useState(80);

    //Random ships at start
    useEffect(() => {
        generateRandomShips();
    }, []);

    //Function for generating random ships
    const generateRandomShips = () => {
        const newGrid = produce(grid, (gridcopy) => {
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < rows; j++) {
                    gridcopy[i][j] = Math.round(Math.random() * 1);
                }
            }
        });
        setGrid(newGrid);
    };

    //Making sure we can only click a box once and the logic connected to it.
    const fillBox = (e, number) => {
        if (numbersArray.includes(e.target.dataset.type)) {
            return;
        }
        console.log(numbersArray);
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
                {grid.map((row, rowIndex) => {
                    return row.map((col, colIndex) => {
                        return (
                            <div
                                data-type={
                                    rowIndex.toString() + colIndex.toString()
                                }
                                key={`${rowIndex}-${colIndex}`}
                                onClick={(e) => {
                                    fillBox(e, grid[rowIndex][colIndex]);
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
